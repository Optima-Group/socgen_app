import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthHttp } from 'angular2-jwt';
import { AppConfig } from "app/config";
import { GenericHttpService } from "app/services/http/generic.http.service";
//import { User } from "app/model/api/identity/user";

/**
 * Identity service (to Identity Web API controller).
 */
@Injectable()
export class IdentityService extends GenericHttpService<any, string> {

    headers: Headers;
    options: RequestOptions;

    constructor(public http: Http, private authHttp: AuthHttp) {

        super(authHttp, "", "identity");

        // Creates header for post requests.
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    // /**
    //  * Gets all users through AuthHttp.
    //  */
    // public GetAll(): Observable<any> {

    //     // Sends an authenticated request.
    //     return this.authHttp.get("/api/identity/GetAll")
    //         .map((res: Response) => {

    //             return res.json();

    //         })
    //         .catch((error: any) => {

    //             // Error on get request.
    //             return Observable.throw(error);

    //         });

    // }

    /**
     * Creates a new user.
     *
     * @param model User's data
     * @return An IdentityResult
     */
    public Create(model: any): Observable<any> {

        let body: string = JSON.stringify(model);

        return this.http.post(AppConfig.urlPrefix + "identity/create", body, this.options)
            .map((res: Response) => {

                return res.json();

            })
            .catch((error: any) => {

                // Error on post request.
                return Observable.throw(error);

            });

    }

    public ChangePassword(model: any): Observable<any> {

        let body: string = JSON.stringify(model);

        return this.http.post(AppConfig.urlPrefix + "identity/password", body, this.options)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                // Error on post request.
                return Observable.throw(error);
            });
    }

    public ResetPassword(model: any): Observable<any> {

        let body: string = JSON.stringify(model);

        return this.http.post(AppConfig.urlPrefix + "identity/resetpassword", body, this.options)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                // Error on post request.
                return Observable.throw(error);
            });
    }

     public UpdateUserAdmCenter(model: any): Observable<any> {

        let body: string = JSON.stringify(model);

        return this.http.post(AppConfig.urlPrefix + "identity/admcenter", body, this.options)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                // Error on post request.
                return Observable.throw(error);
            });
    }
    public UpdateUserEmployee(model: any): Observable<any> {

                let body: string = JSON.stringify(model);

                return this.http.post(AppConfig.urlPrefix + "identity/employee", body, this.options)
                    .map((res: Response) => {
                        return res.json();
                    })
                    .catch((error: any) => {
                        // Error on post request.
                        return Observable.throw(error);
                    });
            }

    // /**
    //  * Deletes a user through AuthHttp.
    //  *
    //  * @param username Username of the user
    //  * @return An IdentityResult
    //  */
    // public Delete(username: string): Observable<any> {

    //     let body: string = JSON.stringify(username);

    //     // Sends an authenticated request.
    //     return this.authHttp.post("/api/identity/Delete", body, this.options)
    //         .map((res: Response) => {

    //             return res.json();

    //         })
    //         .catch((error: any) => {

    //             // Error on post request.
    //             return Observable.throw(error);

    //         });

    // }

    /**
     * Deletes a user through AuthHttp.
     *
     * @param username Username of the user
     * @return An IdentityResult
     */
    public Delete(username: string): Observable<any> {

        let body: string = JSON.stringify(username);

        // Sends an authenticated request.
        return this.http.post(AppConfig.urlPrefix + "identity/delete", body, this.options)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                // Error on post request.
                return Observable.throw(error);
            });
    }

    public updateUser(userEmail: string, claimsValue: string): Observable<void> {
        return this.http.put(AppConfig.urlPrefix + 'identity/updateUser' + `/${userEmail}/${claimsValue}`
            , { headers: this.headers })
            .map(() => {});
    }

    // Add other methods.

    public forgetPassword(userEmail: string): Observable<boolean> {
      let body: string = JSON.stringify(userEmail);
      return this.http.post(AppConfig.urlPrefix + 'identity/forgetPassword', body, { headers: this.headers })
          .map((data: Response) => {
            return data.json();
          });
    }

    public ResetEmailPassword(model: any): Observable<any> {

      let body: string = JSON.stringify(model);

      return this.http.post(AppConfig.urlPrefix + "identity/resetemailpassword", body, this.options)
          .map((res: Response) => {
              return res.json();
          })
          .catch((error: any) => {
              // Error on post request.
              return Observable.throw(error);
          });
    }

}

// import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

// import { AuthHttp } from 'angular2-jwt';
// import { AppConfig } from "app/config";
// import { GenericHttpService } from "app/services/http/generic.http.service";
// import { User } from "app/model/api/identity/user";

// /**
//  * Identity service (to Identity Web API controller).
//  */
// @Injectable()
// export class IdentityService extends GenericHttpService<User, string> {

//     headers: Headers;
//     options: RequestOptions;

//     constructor(private authHttp: AuthHttp, private http: Http) {

//         // Creates header for post requests.
//         this.headers = new Headers({ 'Content-Type': 'application/json' });
//         this.options = new RequestOptions({ headers: this.headers });

//     }

//     /**
//      * Gets all users through AuthHttp.
//      */
//     public GetAll(): Observable<any> {

//         // Sends an authenticated request.
//         return this.authHttp.get("/api/identity/GetAll")
//             .map((res: Response) => {

//                 return res.json();

//             })
//             .catch((error: any) => {

//                 // Error on get request.
//                 return Observable.throw(error);

//             });

//     }

//     /**
//      * Creates a new user.
//      *
//      * @param model User's data
//      * @return An IdentityResult
//      */
//     public Create(model: any): Observable<any> {

//         let body: string = JSON.stringify(model);

//         return this.http.post(AppConfig.urlPrefix + "identity/create", body, this.options)
//             .map((res: Response) => {

//                 return res.json();

//             })
//             .catch((error: any) => {

//                 // Error on post request.
//                 return Observable.throw(error);

//             });

//     }

//     /**
//      * Deletes a user through AuthHttp.
//      *
//      * @param username Username of the user
//      * @return An IdentityResult
//      */
//     public Delete(username: string): Observable<any> {

//         let body: string = JSON.stringify(username);

//         // Sends an authenticated request.
//         return this.authHttp.post("/api/identity/Delete", body, this.options)
//             .map((res: Response) => {

//                 return res.json();

//             })
//             .catch((error: any) => {

//                 // Error on post request.
//                 return Observable.throw(error);

//             });

//     }

//     // Add other methods.

// }
