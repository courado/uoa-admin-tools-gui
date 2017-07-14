/**
 * Created by stefania on 7/13/17.
 */
import { Page } from "./page";

export interface PageHelpContent {
    _id: string;
    page: Page | string;
    placement : string;
    order: number;
    content: string;
    isActive: boolean;
}

export interface CheckPageHelpContent {
    pageHelpContent : PageHelpContent;
    checked : boolean;
}

export interface PageHelpContentFilterOptions {
    id : string;
    active : Boolean;
    text : RegExp;
}