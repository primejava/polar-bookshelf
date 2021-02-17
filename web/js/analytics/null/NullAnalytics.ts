import {IAnalytics, IAnalyticsUser, IEventArgs, IPageEvent, TraitsMap} from "../IAnalytics";

export class NullAnalytics implements IAnalytics {

    public event(event: IEventArgs): void {
    }

    public event2(event: string, data?: any): void {
    }

    public identify(user: IAnalyticsUser): void {
    }

    public page(event: IPageEvent): void {
    }

    public traits(map: TraitsMap): void {
    }

    public version(version: string): void {
    }

    public heartbeat(): void {

    }

}
