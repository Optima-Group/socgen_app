export class AppUtils {
    public static copyObject<T>(object: T): T {
        var objectCopy = <T>{};

        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                objectCopy[key] = object[key];
            }
        }

        return objectCopy;
    }

    public static roundToTwo(num: number) {
        return +(Math.round(Number(num + "e+2"))  + "e-2");
    }

    public static getNumberIdsList<T extends IEntity<number>>(items: Array<T>): string {
        return this.getIdsList<T, number>(items);
    }

    public static getIdsList<T extends IEntity<V>, V>(items: Array<T>): string {
        let ids: Array<V> = new Array<V>();

        if ((items != null) && (items.length > 0)) {
            items.forEach((item: T) => {
                if (item != null) ids.push(item.id);
            });
        }

        return ((ids.length > 0) ? JSON.stringify(ids) : null);
    }

// function roundToTwo(num) {
//     return +(Math.round(num + "e+2")  + "e-2");
// }

// function round(value, decimals) {
//   return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
// }
}