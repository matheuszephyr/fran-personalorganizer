export function isNullOrUndefined(value: any): boolean {
    let ret = !(value != undefined && value != null);
    return ret;
}

export function isNullOrEmpty(value: any) {
    let ret = isNullOrUndefined(value) || !(value > 0 || value != "" || value.lenght > 0);
    return ret;
}