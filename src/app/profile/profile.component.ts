import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../services/group-data.service';
import { UserDataService } from '../services/user-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public user: User;
  public email: string | null;
  public newPassword: string | null = null;
  public updateError: string | null = null;
  public profileImg: any;
  public uploadImg: File | null = null;

  constructor(
    public auth: AuthenticationService,
    public userService: UserDataService,
    private sanitiser: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.userService.getUser(this.auth.user?._id!).subscribe((res) => {
      this.user = res;
      console.log(this.user);
      this.email = this.user.email!;

      if (this.user.imagePath) {
        this.profileImg = this.sanitiser.bypassSecurityTrustUrl(
          this.user.imagePath
        );
      } else {
        this.profileImg = this.sanitiser.bypassSecurityTrustUrl(
          this.userService.defaultImage
        );
      }
    });
  }
  onChange(event: any) {
    this.uploadImg = event.target.files[0];
  }
  updateImg() {
    console.log('HEEE');
    if (this.uploadImg) {
      this.userService
        .uploadProfileImg(this.user._id!, this.uploadImg)
        .subscribe((res) => {
          this.userService.getUser(this.user._id!).subscribe((res) => {
            this.user = res;
            this.email = this.user.email!;
            let timestamp = new Date().getTime();
            this.profileImg = this.user.imagePath + '?t=' + timestamp;
          });
        });
    }
  }
  updateUser() {
    if (this.user.email === this.email && !this.newPassword) {
      this.updateError = 'Nothing to update';
    } else {
      this.userService
        .updateUsr(this.user._id!, this.email, this.newPassword)
        .subscribe((res) => {
          this.userService.getUser(this.auth.user?._id!).subscribe((res) => {
            this.user = res;
            this.email = this.user.email!;
            this.updateError = 'Updated';
          });
        });
    }
    // let updatedUser: User = {
    //   password: this.newPassword,
    //   email: this.email,
    // }
    // this.userService.updateUsr(this.user._id!, updatedUser)
  }
}
