'use strict';

import { AppEventType } from './enums/appEventType';

export class AppEvent {
    public type: AppEventType;
    public payload: any;
    public triggeredByModule?: any;
    public isStatic?: boolean ;
}
