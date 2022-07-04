import { AssetEntry } from "../entities/asset-entry.entity";

export interface IAssetEntry {
    id?: number;
    txnDay?: number;
    txnMonth?: number;
    txnYear?: number;
    description: string;
    asset: string;
    acquired?: boolean
}

/**
 * Below is used for data passed to SectionList display
 */
export interface EntriesInDateSections {
    data: IAssetEntry[],
    title: string
}

/**
* Display options
*/
export enum DisplayOptions {
    SECTION_LIST_BY_DATE = 1,
    FLAT_LIST = 2,
    SPREADSHEET = 3
}

export type ISettings = {
    onSettings: boolean,
    displayOption: DisplayOptions
}

//As we are using TypeScript, we can optionally let stack navigator know which
//screens to expect and which initial parameters may be passed to them during navigation
//We will then have to use initialParams in each Stack.Screen to indicate the params specified in types
//e.g. for EditEntryScreen would be initialParams={AssetEntryToEdit:AssetEntry}

export type AppStackParamList = {
    AssetEntryHomeScreen: undefined; //no parameters expected to be passed to route when called
    AddEntryScreen: undefined;
    EditEntryScreen: { AssetEntryToEdit: AssetEntry }; //means that AssetEntryToEdit must be passed
    SettingsScreen: undefined;
};
