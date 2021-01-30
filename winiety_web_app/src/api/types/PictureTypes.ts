export interface PictureData {
  plateNumber: string;
  isRecognized: boolean;
}

export interface Picture extends PictureData {
  id: number;
  imagePath: string;
}

export interface PostPicture extends PictureData {
  pictureId: number;
}
