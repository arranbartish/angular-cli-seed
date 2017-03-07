import { NavigationItemComponent } from './navigation-item.component';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture, inject, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Location, LocationStrategy } from '@angular/common';
import * as _ from 'lodash';



function parameters(dataArray, testCaseFunction) {
    _.each(dataArray, function (innerArray) {
        testCaseFunction.apply(this, innerArray);
    });
}

describe('NavigationItemComponent', () => {
    let fixture: ComponentFixture<NavigationItemComponent>;
    let component: NavigationItemComponent;
    let _aLink: any;
    let cmpLocation: Location;

    const homeLink = { title: 'Home', targetUrl: '/home', imageCssClass: 'glyphicon-home' };
    const searchLink = { title: 'Search', targetUrl: '/search', imageCssClass: 'glyphicon-search' };
    const carLink = { title: 'Car', targetUrl: '/car', imageCssClass: 'glyphicon-road' };

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
        });
        cmpLocation = loc;
    })));


     parameters([
        [homeLink, '/home'],
        [searchLink, '/search'],
        [carLink, '/car']
    ], function (elmt, expected) {
        it('will generate link for' + expected, async(function () {
            component.treeElements = [elmt];
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                _aLink = fixture.debugElement.nativeElement.querySelector('a');
                expect(_aLink.href).toContain(expected);
            });
        }));
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('will call isNode when asNode is called with same element', () => {
        const isNode = spyOn(component, 'isNode').and.callThrough();
        const asNode = component.asNode(homeLink);
        expect(isNode).toHaveBeenCalled();
        expect(asNode).toBe(null);
    });


    it('will return false when no children element', () => {
        expect(component.isNode(homeLink)).toBe(false);
    });


    it('will return true when element has children', () => {
        const homeChildren: any = homeLink;
        homeChildren.children = [{}];
        expect(component.isNode(homeChildren)).toBe(true);
    });


    it('will not activate the element if it\'s not clicked', () => {
        expect(component.isActiveNavItem(homeLink)).toBe(false);
    });


    it('will show search as active link', () => {
        const spyLocation: any = cmpLocation.path;

        const expected = searchLink.targetUrl;
        spyLocation.and.returnValue('/search');
        expect(component.isActiveNavItem(searchLink)).toBe(true);
    });

});


