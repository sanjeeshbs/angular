
export class TokenPayload{
    username:string;
    roles:Roles[];
}

export class Roles{
    rolename:string;
    privilages:Previlages[];
}

export class Previlages{
    resourceName:string;
    get:boolean;
    post:boolean;
    update:boolean;
    delete:boolean;
}

// export interface TokenPayload {
//     username:string,
//     roles: Roles[]
// }

// export interface Roles {
//     rolename:string,
//     privilages:resourcePrivilages[]

// }
// export interface resourcePrivilages {
//     resourceName:string,
//     get:boolean,
//     post:boolean,
//     update:boolean,
//     delete:boolean
// }


// payload: {
  //   username: "",
  //   roles: [
  //     {
  //       rolename: "",
  //       resourcePrivilages: [
  //         { resourceName: "", get: false, post: false, update: false, delete: false },
  //       ]
  //     },
  //     {
  //       rolename: "",
  //       resourcePrivilages: [
  //         { resourceName: "", get: false, post: false, update: false, delete: false },
  //       ]
  //     }
  //   ]
  // }