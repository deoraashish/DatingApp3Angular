import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-memeber-details',
  templateUrl: './memeber-details.component.html',
  styleUrls: ['./memeber-details.component.css']
})
export class MemeberDetailsComponent implements OnInit {

  public member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private memberService: MembersService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();

    this.galleryOptions = [{
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
    }];

  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    this.member.photos.forEach(p => {
      imageUrls.push({
        small: p.url,
        medium: p.url,
        high: p.url,
      });
    });
    return imageUrls;
  }

  loadMember() {
    this.memberService.getMember(this.router.snapshot.paramMap.get('username')).subscribe(m => {
      this.member = m;
      this.galleryImages = this.getImages();
    });
  }

}
