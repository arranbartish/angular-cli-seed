import { NavigationItemComponent } from './navigation-item.component';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture, inject, fakeAsync } from '@angular/core/testing';
import { Location, LocationStrategy } from '@angular/common';
import * as _ from 'lodash';
import { TreeNode } from './valueObject/treeNode';
import { TreeLeaf } from './valueObject/treeLeaf';
import { TreeElement } from './valueObject/treeElement';

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
                        path = jasmine.createSpy('path');
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


    parameters([
        [navMenu[0], expected[0]],
        [navMenu[1], expected[1]],
        [navMenu[2], expected[2]]],
        (elmt: TreeElement, result) => {

            it('will generate link for ' + elmt.targetUrl, async(() => {
                fixture.whenStable().then(() => {
                    const links = _.filter(fixture.debugElement.children, (del: DebugElement) => {
                        return del.children[0].nativeElement.attributes.id.value === elmt.title;
                    });
                    const _aLink = links[0].nativeElement.querySelector('a');
                    expect(_aLink.href).toContain(elmt.targetUrl);
                });
            }));

            it('will verify if  ' + elmt.title + '  is a node', async(() => {
                fixture.whenStable().then(() => {
                    expect(component.isNode(elmt)).toBe(result.isNode);
                });
            }));


            it('will verify if  ' + elmt.title + '  is as node', async(() => {
                fixture.whenStable().then(() => {
                    expect(component.asNode(elmt)).toBe(result.asNode);
                });
            }));


            it('will verify if  ' + elmt.title + '  is active', async(() => {
                fixture.whenStable().then(() => {
                    const spyLocation: jasmine.Spy = <jasmine.Spy>cmpLocation.path;
                    const isActive: boolean = result.isActive;
                    if (isActive) {
                        spyLocation.and.returnValue(elmt.targetUrl);
                    }
                    expect(component.isActiveNavItem(elmt)).toBe(result.isActive);
                });
            }));
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


