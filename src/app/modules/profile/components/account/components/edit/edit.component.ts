import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientService} from '../../../../../../services/patient.service';
import {Patient} from '../../../../../../models/patient';
import {Router} from '@angular/router';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

    public patient: Patient = new Patient();
    public editForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private patientService: PatientService,
                private router: Router) {
    }

    ngOnInit() {
        this.patientService.getPatient().subscribe((data: Patient) => this.patient = data);
        this.editForm = this.formBuilder.group({
            firstName: [this.patient.firstName, [Validators.required]],
            lastName: [this.patient.lastName, [Validators.required]],
            dateOfBirth: [this.patient.dateOfBirth],
            height: [this.patient.height],
            weight: [this.patient.weight],
            location: [this.patient.location],
            phoneNumber: [this.patient.phoneNumber, [Validators.required]],
            email: [this.patient.email, [Validators.email, Validators.required]],
        });
    }

    get email() {
        return this.editForm.get('email');
    }

    get firstName() {
        return this.editForm.get('firstName');
    }

    public get lastName() {
        return this.editForm.get('lastName');
    }

    get phoneNumber() {
        return this.editForm.get('phoneNumber');
    }

    submit() {
        console.log(this.editForm.value);
        this.patientService.editPatient(this.editForm.value)
            .subscribe((userData) => {
                console.log(userData);
                this.router.navigate(['/profile/account']);
            }, (error => {
                console.log(error);
            }));
    }
}
