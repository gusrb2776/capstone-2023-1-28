/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
//
// "small_button" id를 가진 <div> 요소에 클릭 이벤트 리스너를 추가하십시오.

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

var imageDisplayTimer;


function predict(url_param) {
    var imagesToDisplay = [];  // 응답 이미지 배열
    var currentIndex = 0;  // 현재 표시 중인 이미지의 인덱스
    var inputImages = [];
    var outputImages = [];

    // 이미지 표시 타이머 중지
    clearTimeout(imageDisplayTimer);

    // /predict 라우트에 대한 AJAX 요청을 보냅니다.
    $.ajax({
        url: '/predict' + url_param,
        method: 'POST',
        success: function(response) {
            // 이미지 배열 초기화
            imagesToDisplay = [];
            currentIndex = 0;
            inputImages = [];
            outputImages = [];

            // 응답 이미지를 배열에 저장합니다.
            response.forEach(function(imagePath) {
                // 역슬래시를 슬래시로 교체합니다.
                imagePath = imagePath.replace(/\\/g, '/');
                imagesToDisplay.push(imagePath);

                // input과 output 이미지를 분류합니다.
                if (imagePath.startsWith('static/results' + url_param + '/png/input_')) {
                    inputImages.push(imagePath);
                } else if (imagePath.startsWith('static/results' + url_param + '/png/output_')) {
                    outputImages.push(imagePath);
                }
            });

            // 이미지를 표시하는 함수 설정
            function displayImages() {
                if (currentIndex < inputImages.length) {
                    var inputImage = document.createElement('img');
                    var outputImage = document.createElement('img');

                    inputImage.src = inputImages[currentIndex];
                    outputImage.src = outputImages[currentIndex];

                    // 이미지를 각각의 div에 추가합니다.
                    $('#input_body').empty().append(inputImage);
                    $('#result_body').empty().append(outputImage);
                    currentIndex++;
                }
                if (currentIndex < inputImages.length) {
                    // 4초 후에 다음 짝의 이미지를 표시합니다.
                    imageDisplayTimer = setTimeout(displayImages, 4000);
                }
            }

            // 초기 이미지 표시를 시작합니다.
            displayImages();
        }
    });
}

function updateProgressBar(percent) {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = percent + '%';
}