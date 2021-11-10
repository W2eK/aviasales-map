import useEmblaCarousel from 'embla-carousel-react';

export const EmblaCarousel = () => {
  const [viewportRef, embla] = useEmblaCarousel({
    align: 'center',
    skipSnaps: false
  });
  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {Array.from(new Array(10).keys()).map(index => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__inner">{index}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
