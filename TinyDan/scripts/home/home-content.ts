'use strict';

import {
    Component,
    enableProdMode
}  from '@angular/core';
import {
    FormGroup,
    FormControl
} from "@angular/forms";

enableProdMode();

@Component({
    selector: 'content',
    templateUrl: '../../templates/home/home-content.html'
})
export class HomeContentComponent {
    public homeContentForm: FormGroup;
    public ctrlRandom: FormControl;
    public ctrlCustom: FormControl;
    public ctrlLongUrl: FormControl;
    public ctrlCustomAlias: FormControl;
    public random: string;
    public custom: string;
    public longUrl: string;
    public customAlias: string;
    public submitText: string;
    public url: any;

    constructor() {
        this.random = 'Random alias';
        this.custom = 'Custom alias';
        this.longUrl = 'Enter long URL to to TinyDan-fy.';
        this.customAlias = 'May contain letters, numbers, and dashes.';
        this.submitText = 'TinyDan-fy it!';
        this.url = {
            aliasType: 'random',
            longUrl: '',
            customAlias: ''
        };

        // build the form
        this.ctrlRandom = new FormControl('');
        this.ctrlCustom = new FormControl('');
        this.ctrlLongUrl = new FormControl('');
        this.ctrlCustomAlias = new FormControl('');
        this.homeContentForm = new FormGroup({
            random: this.ctrlRandom,
            custom: this.ctrlCustom,
            longUrl: this.ctrlLongUrl,
            customAlias: this.ctrlCustomAlias
        });
    }

    public ngOnInit() {
    }

    public aliasTypeChange(evt: any) {
        const target: any = evt.target;
        if (target.checked) {
            this.url.aliasType = target.value;
        }        
    }
}



//'use strict';

//import {
//    //Component,
//    Inject,
//    Input,
//    OnInit,
//    OnDestroy,
//    //enableProdMode
//} from '@angular/core';
//import {
//    //FormGroup,
//    //FormControl,
//    Validators
//} from "@angular/forms";
//import { ISubscription } from 'rxjs/Subscription';
//import { ItemDetailBaseComponent } from './item-detail-base';
//import { ItemDetailService } from './item-detail-service';
//import { AppStateService } from '../app/app-state-service';
//import { AppStateType } from '../models/enums/appStateType';
//import { AppObservableService } from '../app/app-observable-service';
//import { AppEvent } from '../models/appEvent';

//enableProdMode();

//@Component({
//    selector: 'detail-content',
//    templateUrl: '../../templates/item/item-detail-content.html'
//})
//export class ItemDetailContentComponent extends ItemDetailBaseComponent {
//    @Input() module: AppStateType;
//    private activeItemSubs: ISubscription;
//    private currentUserSubs: ISubscription;
//    private readOnlySubs: ISubscription;
//    public activeItem: any;
//    public detailContentForm: FormGroup;
//    public ctrlName: FormControl;
//    public ctrlDescription: FormControl;
//    public projectPermissions: string[];
//    public itemDetailTabs: any[];
//    public activePermission: string;
//    public followingItem: boolean;
//    public userId: string;
//    public userName: string;
//    public readOnly: boolean;

//    constructor(
//        @Inject(AppStateService) public appStateService: AppStateService,
//        @Inject(ItemDetailService) public itemDetailService: ItemDetailService,
//        @Inject(AppObservableService) private appObservableService: AppObservableService) {
//        super(appStateService, itemDetailService);
//        this.loading = true;

//        // TODO: Move Projects taxonomy data to common component
//        this.projectPermissions = ['Public', 'Private', 'Only Me'];

//        this.activeItem = this.activeItem || {
//            id: '0',
//            visibility: 0,
//            name: '',
//            dueDate: '00/00/00'
//        }

//        // build the form
//        this.ctrlName = new FormControl('');
//        this.ctrlDescription = new FormControl('');
//        this.detailContentForm = new FormGroup({
//            name: this.ctrlName,
//            description: this.ctrlDescription
//        });

//        this.userId = '';
//    }

//    public ngOnInit() {
//        this.currentModule = this.module;
//        super.ngOnInit();

//        let context = this;

//        this.currentUserSubs = this.appObservableService.currentUser$.subscribe((event: AppEvent) => {
//            let user = event.payload;
//            context.currUser = user || {};
//            context.userId = context.currUser.id;
//            context.userName = context.currUser.name;
//            context.currUser.userId = context.userId;
//            context.followingItem = context.isCurrentUserFollowingItem(context.activeItem);
//        });

//        this.activeItemSubs = this.activeItemSubs || this.itemDetailService.activeItem$.subscribe(function (item: any) {
//            context.activeItem = item;
//            context.followingItem = false;
//            if (item) {
//                context.activePermission = context.projectPermissions[item.visibility];
//                context.followingItem = context.isCurrentUserFollowingItem(item);
//            }
//        }.bind(this));

//        this.readOnlySubs = this.readOnlySubs || this.itemDetailService.readOnly$.subscribe(function (flag: any) {
//            context.readOnly = flag;
//        }.bind(this));

//        this.itemDetailService.getCurrentUser();
//        this.activeItem = this.itemDetailService.getActiveItem() || this.activeItem;

//        if (this.activeItem) {
//            this.activePermission = this.projectPermissions[this.activeItem.visibility];
//        }

//        this.loading = false;
//    }

//    public ngOnDestroy() {
//        if (this.activeItemSubs) {
//            this.activeItemSubs.unsubscribe();
//        }

//        if (this.currentUserSubs) {
//            this.currentUserSubs.unsubscribe();
//        }
//    }

//    public setActivePermission(permission: number): void {
//        this.activePermission = this.projectPermissions[permission];
//        this.activeItem.visibility = permission;
//        if (this.activeItem.id) {
//            if (this.itemDetailService.activeItemChangeObserver) {
//                this.itemDetailService.activeItemChangeObserver.next(this.activeItem);
//            }
//        }
//    }

//    public navigateToProject() {
//        this.itemDetailService.navigateToProject(this.activeItem);
//    }

//    public followOrUnfollow(follow: boolean) {
//        this.itemDetailService.followOrUnfollow(this.activeItem, follow);
//    }

//    public follow() {
//        this.itemDetailService.addFollowingUser(this.userId, true);
//    }

//    public unFollow() {
//        this.itemDetailService.removeFollowingUser(this.userId, this.currUser, true);
//    }

//    private isCurrentUserFollowingItem(item: any): boolean {
//        if (!item.resources || !item.resources.followers || !item.resources.followers.data) {
//            return false;
//        }

//        let context = this;
//        let following: any[] = item.resources.followers.data.filter(function (f: any): boolean {
//            return f.name === context.userName && !f.archived;
//        });
//        return following.length > 0;
//    }
//}
