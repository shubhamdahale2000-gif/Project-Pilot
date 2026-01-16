// export class userData {
//     email:string = '';
//     password:string = '';
// }

export class projectData {
    id: number = 0;
    projectName:string = '';
    reason:string = '';
    type:string = '';
    division:string = '';
    category:string = '';
    priority:string = '';
    department:string = '';
    startDate:string = '';
    endDate:string = '';
    location:string = '';
    status:string = '';
}

export interface statusData {
    registered: number;
    running: number;
    closed:  number;
    cancelled: number;
    delayCloser: number;
}