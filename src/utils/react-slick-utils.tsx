export function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "red" }}
      onClick={onClick}
    />
  );
}

export function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "green" }}
      onClick={onClick}
    />
  );
}

export var bannerSettings = {
  dots: false,
  infinite: true,
  fade: true,
  lop: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

export var offerProductSettings = {
  dots: false,
  infinite: true,
  lop: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
