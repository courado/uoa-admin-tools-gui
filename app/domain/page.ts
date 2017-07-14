/**
 * Created by stefania on 7/13/17.
 */
export interface Page {
    _id: string;
    route: string;
    name: string;
}

export interface CheckPage {
    page : Page;
    checked : boolean;
}