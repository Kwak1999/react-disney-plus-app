import React, {useRef} from "react";
import './MovieModal.css'
import useOnClickOutside from "../../hook/useOnClickOutside";

// `MovieModal` 컴포넌트는 영화의 상세 정보를 표시하는 모달 창을 렌더링합니다.
// props로 받은 영화 데이터(`backdrop_path`, `title` 등)와 모달 제어 함수를 사용합니다.
const MovieModal = ({
                        backdrop_path,
                        title,
                        overview,
                        name,
                        release_date,
                        first_air_date,
                        vote_average,
                        setModalOpen // 모달의 열림/닫힘 상태를 제어하는 함수
                    }) => {

    // `useRef` 훅을 사용해 모달 컴포넌트의 DOM 요소를 참조합니다.
    const ref = useRef();

    // `useOnClickOutside` 커스텀 훅을 사용하여
    // 모달(`ref`) 바깥 영역을 클릭했을 때 `setModalOpen`을 호출하여 모달을 닫습니다.
    useOnClickOutside(ref, () => {
        setModalOpen(false);
    })

    return (
        // `role="presentation"` 속성은 모달의 시각적 역할만 있음을 스크린 리더에 알립니다.
        <div className='presentation' role="presentation">
            <div className='wrapper-modal'>
                {/* ref를 연결하여 `useOnClickOutside` 훅이 이 요소를 감지하게 합니다. */}
                <div className='modal' ref={ref}>
                    {/* 모달 닫기 버튼. 클릭 시 `setModalOpen(false)`를 호출해 모달을 닫습니다. */}
                    <span
                        onClick={() => setModalOpen(false)}
                        className="modal-close"
                    >
            X
          </span>
                    <img
                        className='modal__poster-img'
                        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                        alt="modal-img"
                    />

                    <div className='modal__content'>
                        {/* 영화의 개봉일 또는 첫 방영일을 표시합니다. */}
                        <p className='modal__details'>
                            <span className='modal__user_perc'>100% for you</span>{" "}
                            {release_date ? release_date : first_air_date}
                        </p>

                        {/* 영화의 제목 또는 이름을 표시합니다. */}
                        <h2 className='modal__title'> {title ? title : name}</h2>
                        {/* 영화의 평균 평점을 표시합니다. */}
                        <p className='modal__overview'>평점: {vote_average}</p>
                        {/* 영화의 개요를 표시합니다. */}
                        <p className='modal__overview'>{overview}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieModal