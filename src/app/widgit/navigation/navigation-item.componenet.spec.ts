import {NavigationItemComponent} from './navigation-item.component';
import {NO_ERRORS_SCHEMA, DebugElement} from '@angular/core';
import {TestBed, async, ComponentFixture, inject} from '@angular/core/testing';
import {Location, LocationStrategy} from '@angular/common';
import * as _ from 'lodash';
import {TreeNode} from './valueObject/treeNode';
import {TreeLeaf} from './valueObject/treeLeaf';
import {TreeElement} from './valueObject/treeElement';

describe('NavigationItemComponent', () => {
    let fixture: ComponentFixture<NavigationItemComponent>;
    let component: NavigationItemComponent;
    let cmpLocation: Location;
    const inputs = getData();
    const navMenu = inputs[0];
    const expected = inputs[1];

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                NavigationItemComponent
            ],
            providers: [
                {
                    provide: Location,
                    useClass: class {
                        path = sinon.stub();
                    }
                }, LocationStrategy],
            schemas: [NO_ERRORS_SCHEMA]
        });

    });

    beforeEach(async(inject([Location], (loc: Location) => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(NavigationItemComponent);
            component = fixture.componentInstance;
            component.treeElements = navMenu;
            fixture.detectChanges();
        });
        cmpLocation = loc;
    })));

    function createComparableElement (element: any) {
      const _comparableElmt = _.cloneDeep(element);
      delete _comparableElmt.children;
      delete _comparableElmt.imageCssClass;
      return _comparableElmt;
    }

    function representElementNode (elementNode: any, elementLink: any) {
      return {
        title: elementLink.title,
        routerLink: elementLink.routerLink,
      };
    }

    function representLink (elementLink: any, elementSpan: any) {
      return {
        title: _.replace(elementLink.id, 'nav-link-', ''),
        targetUrl : _.replace(elementLink.routerLink, /^http:\/\/.+:[0-9]+/ , '')
      };
    }

    function findLinkByName(name: string) {
      const links = _.filter(fixture.debugElement.children, (element: DebugElement) => {
        const elementId = element.children[0].nativeElement.attributes.id.value;
        return _.endsWith( elementId, 'nav-node-' + name ) || _.endsWith( elementId, 'nav-link-' + name );
      });
      if (!_.isEmpty(links[0].nativeElement.querySelector('ul'))) {
        return representElementNode(links[0].nativeElement.querySelector('ul'), links[0].nativeElement.querySelector('a'));
      } else {
        return representLink(links[0].nativeElement.querySelector('a'), links[0].nativeElement.querySelector('span'));
      }
    }

    parameters([
        [navMenu[0], expected[0]],
        [navMenu[1], expected[1]],
        [navMenu[2], expected[2]]
         ],
        (elmt: TreeElement, result) => {

            it('will generate link for ' + elmt.title, sinon.test(async(() => {
                fixture.whenStable().then(() => {
                    const _comparableElmt = createComparableElement(elmt);
                    const _aLink = findLinkByName(elmt.title);
                    expect(_aLink).to.eql(_comparableElmt);
                });
            })));

            // remove these
            it('will verify if  ' + elmt.title + '  is a node', sinon.test(async(() => {
                fixture.whenStable().then(() => {
                    expect(component.isNode(elmt)).to.eql(result.isNode);
                });
            })));


            it('will verify if  ' + elmt.title + '  is as node', sinon.test(async(() => {
                fixture.whenStable().then(() => {
                    expect(component.asNode(elmt)).to.eql(result.asNode);
                });
            })));


            it('will verify if  ' + elmt.title + '  is active', sinon.test(async(() => {
                fixture.whenStable().then(() => {
                    const isActive: boolean = result.isActive;
                    if (isActive) {
                        cmpLocation.path.returns(elmt.targetUrl);
                    }
                    expect(component.isActiveNavItem(elmt)).to.equal(result.isActive);
                });
            })));
        });

});

// Helper functions.
function parameters(inputData, execFunction) {
    _.each(inputData, (record) => {
        execFunction.call(this, record[0], record[1]);
    });
}


function getData(): Array<any> {
    const homeNode: TreeElement = { title: 'Home', targetUrl: '/home', imageCssClass: 'glyphicon-home' };
    const searchNode: TreeElement = { title: 'Search', targetUrl: '/search', imageCssClass: 'glyphicon-search' };
    const brande: TreeLeaf = { title: 'Brand', targetUrl: '/car/brand', imageCssClass: 'glyphicon-road' };
    const type: TreeLeaf = { title: 'Type', targetUrl: '/car/type', imageCssClass: 'glyphicon-road' };
    const carNode: TreeNode = { title: 'Car', targetUrl: '/car', children: [brande, type], imageCssClass: 'glyphicon-road' };
    const menu: Array<TreeElement> = [homeNode, searchNode, carNode];

    const expectedTable: Array<any> = [
        { isNode: false, isActive: false, asNode: null },
        { isNode: false, isActive: false, asNode: null },
        { isNode: true, isActive: true, asNode: carNode },
    ];
    return [menu, expectedTable];
}


