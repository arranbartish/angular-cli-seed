import { NavigationItemComponent } from './navigation-item.component';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture, inject, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Location, LocationStrategy } from '@angular/common';

describe('NavigationItemComponent', () => {
    let fixture: ComponentFixture<NavigationItemComponent>;
    let component: NavigationItemComponent;
    let _aLink, link: any;

    this.navElements = [
        { title: 'Home', targetUrl: '/home', imageCssClass: 'glyphicon-home' },
        { title: 'Search', targetUrl: '/search', imageCssClass: 'glyphicon-search' },
        { title: 'Car', targetUrl: '/car', imageCssClass: 'glyphicon-road' }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                NavigationItemComponent
            ],
            providers: [
                {
                    provide: Location,
                    useClass: class { path = jasmine.createSpy('path'); }
                }, LocationStrategy],
            schemas: [NO_ERRORS_SCHEMA]
        });

    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(NavigationItemComponent);
            component = fixture.componentInstance;
        });
    }));


    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('will generate link for /Home if provided on treeElements', () => {
        component.treeElements = [this.navElements[0]];
        fixture.detectChanges();
        _aLink = fixture.debugElement.nativeElement.querySelector('a');
        expect(_aLink.href).toContain("/home");
    });


    it('will generate link for /Serach if provided on treeElements', () => {
        component.treeElements = [this.navElements[1]];
        fixture.detectChanges();
        _aLink = fixture.debugElement.nativeElement.querySelector('a');
        expect(_aLink.href).toContain("/search");
    });


    it('will generate link for /Car if provided on treeElements', () => {
        component.treeElements = [this.navElements[2]];
        fixture.detectChanges();
        _aLink = fixture.debugElement.nativeElement.querySelector('a');
        expect(_aLink.href).toContain("/car");
    });


    it('will call isNode when asNode is called with same element', () => {
        let isNode = spyOn(component, 'isNode').and.callThrough();
        component.asNode(this.navElements[0]);
        expect(isNode).toHaveBeenCalled();
    });


    it('will return false when no children element', () => {
        expect(component.isNode(this.navElements[0])).toBe(false);
    });


    it('will return true when element has children', () => {
        let tempo = this.navElements[0];
        tempo.children = ['elmt'];
        expect(component.isNode(tempo)).toBe(true);
    });

    it('will not activate the element if it\'s not clicked', () => {
        expect(component.isActiveNavItem(this.navElements[0])).toBe(false);
    });

  // TODO: need to handle the click to see if path === target

});
