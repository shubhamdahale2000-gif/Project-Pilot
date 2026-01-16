import { Component } from '@angular/core';
import { projectData, statusData } from '../projectData.model';
import { ShareDataService } from '../share-data.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const statusData: statusData = {
    registered : 0,
    running: 0,
    closed: 0,
    cancelled: 0,
    delayCloser:0 
  }

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})

export class ProjectListComponent {

  allStatusData: any;
  // filter
  searchText: string = '';
  column: any;
  allProjectData: any;
  projectDataModelObj: projectData = new projectData;
  // statusData: statusData = new statusData;


  // Add project
  formValue!: FormGroup;
  tempAddProject: Subscription | undefined;
  showAdd: boolean = true;
  showEdit: boolean = false;
  // status change
  previousStatus: string = '';
  currentStatus: string = '';
  id: any;
  // pagination
  page: number = 1;
  tempProjectList: Subscription | undefined;
  tempChangeStatus: Subscription | undefined;
  tempUpdateStatus: Subscription | undefined;

  // on edit employee
  selectedEmp: any = {}
  editMode: boolean = false;
  

  constructor(private shareDataService: ShareDataService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.getProjectList();
    this.formValue = this.fb.group({
      projectName: ['', Validators.required],
      reason: ['', Validators.required],
      type: ['', Validators.required],
      division: ['', Validators.required],
      category: ['', Validators.required],
      priority: ['', Validators.required],
      department: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      status: [''],
    });
  }

  // unsubscribe api call
  ngOnDestroy() {
    if (this.tempProjectList) {
      this.tempProjectList.unsubscribe();
    }
    if (this.tempChangeStatus) {
      this.tempChangeStatus.unsubscribe();
    }
    if (this.tempUpdateStatus) {
      this.tempUpdateStatus.unsubscribe();
    }
    if (this.tempAddProject) {
      this.tempAddProject.unsubscribe()
    }
  }

  // api call to get Project list
  getProjectList() {
    this.tempProjectList = this.shareDataService.getProjectList().subscribe(res => {
      this.allProjectData = res;
    });
  }

  formSubmit(data: any) {

  }

  // method to update status
  changeStatus(data: projectData, status: string) {
    this.projectDataModelObj.id = data.id;
    this.projectDataModelObj.projectName = data.projectName;
    this.projectDataModelObj.reason = data.reason;
    this.projectDataModelObj.type = data.type;
    this.projectDataModelObj.division = data.division;
    this.projectDataModelObj.category = data.category;
    this.projectDataModelObj.priority = data.priority;
    this.projectDataModelObj.department = data.department;
    this.projectDataModelObj.startDate = data.startDate;
    this.projectDataModelObj.endDate = data.endDate;
    this.projectDataModelObj.location = data.location;
    this.projectDataModelObj.status = status;

    this.previousStatus = data.status

    this.tempChangeStatus = this.shareDataService.updateProject(this.projectDataModelObj, this.projectDataModelObj.id).subscribe(res => {
      this.getProjectList();
      alert(`Status updated from ${this.previousStatus} to ${this.currentStatus} Successfully!`);
      return res;
    })
    this.currentStatus = this.projectDataModelObj.status;

    // updating status data through api call
    this.tempUpdateStatus = this.shareDataService.updateStatusData(this.projectDataModelObj.id, this.allStatusData, this.previousStatus, this.currentStatus)
      .subscribe(res => {
        return res;
      })
  }

  // Delete project
  // deleteProject(id:number){
  //    this.shareDataService.deleteProject(id).subscribe(res => {
  //     this.getProjectList();
  //     alert('Project deleted successfully');
  //     return res;
  //    })
  // }


  clearData() {
    this.projectDataModelObj.projectName = ""
    this.projectDataModelObj.reason = ""
    this.projectDataModelObj.type = ""
    this.projectDataModelObj.division = ""
    this.projectDataModelObj.category = ""
    this.projectDataModelObj.priority = ""
    this.projectDataModelObj.department = ""
    this.projectDataModelObj.startDate = ""
    this.projectDataModelObj.endDate = ""
    this.projectDataModelObj.location = ""
    this.projectDataModelObj.status = ""
  }
  // sorting by Column Name
  sortTable(event: any) {
    this.column = event?.target.value;
    const ascendingOrder = true;
    let _allProjectData = [...this.allProjectData]
    _allProjectData.sort((a, b) => {
      if (a[this.column] < b[this.column]) {
        return ascendingOrder ? -1 : 1;
      } else if (a[this.column] > b[this.column]) {
        return ascendingOrder ? 1 : -1;
      } else {
        return 0;
      }
    });
    this.allProjectData = _allProjectData;
  }

  addProjectModel() {
    this.editMode = true;
    this.showAdd = true;
    this.showEdit = false;
    // this.formValue.reset();
  }


  // add project details
  addProject() {

    const payload = { ...this.projectDataModelObj };
    this.clearData();
    this.projectDataModelObj.projectName = this.formValue.value.projectName;
    this.projectDataModelObj.reason = this.formValue.value.reason;
    this.projectDataModelObj.type = this.formValue.value.type;
    this.projectDataModelObj.division = this.formValue.value.division;
    this.projectDataModelObj.category = this.formValue.value.category;
    this.projectDataModelObj.priority = this.formValue.value.priority;
    this.projectDataModelObj.department = this.formValue.value.department;
    this.projectDataModelObj.startDate = this.formValue.value.startDate;
    this.projectDataModelObj.endDate = this.formValue.value.endDate;
    this.projectDataModelObj.location = this.formValue.value.location;
    this.projectDataModelObj.status = this.formValue.value.status || "Registered";

    this.tempAddProject = this.shareDataService.addProject(this.projectDataModelObj).subscribe(res => {
      alert('Project added Successfully!');
      this.formValue.reset();
      this.getProjectList();
    }
    )
  }

  editProjectModel(data: projectData) {
    this.editMode = true;
    this.showAdd = false;
    this.showEdit = true;
    this.projectDataModelObj.id = data.id;
    this.formValue.controls['projectName'].setValue(data.projectName);
    this.formValue.controls['reason'].setValue(data.reason);
    this.formValue.controls['type'].setValue(data.type);
    this.formValue.controls['division'].setValue(data.division);
    this.formValue.controls['category'].setValue(data.category);
    this.formValue.controls['priority'].setValue(data.priority);
    this.formValue.controls['department'].setValue(data.department);
    this.formValue.controls['startDate'].setValue(data.startDate);
    this.formValue.controls['endDate'].setValue(data.endDate);
    this.formValue.controls['location'].setValue(data.location);
    this.formValue.controls['status'].setValue(data.status);
  }

  updateProject() {
    this.projectDataModelObj.projectName = this.formValue.value.projectName;
    this.projectDataModelObj.reason = this.formValue.value.reason;
    this.projectDataModelObj.type = this.formValue.value.type;
    this.projectDataModelObj.division = this.formValue.value.division;
    this.projectDataModelObj.category = this.formValue.value.category;
    this.projectDataModelObj.priority = this.formValue.value.priority;
    this.projectDataModelObj.department = this.formValue.value.department;
    this.projectDataModelObj.startDate = this.formValue.value.startDate;
    this.projectDataModelObj.endDate = this.formValue.value.endDate;
    this.projectDataModelObj.location = this.formValue.value.location;
    this.projectDataModelObj.status = this.formValue.value.status || "Registered";

    this.shareDataService.updateProject(this.projectDataModelObj, this.projectDataModelObj.id).subscribe(res => {
      alert('Project updated Successfully!');
      this.formValue.reset();
      this.getProjectList();
    })

  }

}
