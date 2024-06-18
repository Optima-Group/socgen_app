export class EmailType {
    id: number;
    code: string;
    name: string;
    uploadFolder: string;
    notifyEnabled: boolean;
    notifyStart: Date;
    notifyEnd: Date;
    notifyInterval: number;
    notifyLast: Date;
    headerMsg: string;
    footerMsg: string;
    customMsg: string; 



    constructor(id: number, code: string, name: string, uploadFolder: string, notifyEnabled: boolean,
        notifyStart: Date,
        notifyEnd: Date,
        notifyInterval: number,
        notifyLast: Date,
        headerMsg: string,
        footerMsg: string,
        customMsg: string) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.uploadFolder = uploadFolder;
        this.notifyEnabled = notifyEnabled;
        this.notifyStart = notifyStart;
        this.notifyEnd = notifyEnd;
        this.notifyInterval = notifyInterval;
        this.notifyLast = notifyLast;
        this.headerMsg = headerMsg;
        this.footerMsg = footerMsg;
        this.customMsg = customMsg;
    }
}