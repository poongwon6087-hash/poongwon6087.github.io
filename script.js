// 스크롤 시 상단으로 이동 버튼 표시/숨김
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// 상단으로 부드럽게 스크롤
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 섹션 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 모든 섹션과 카드에 애니메이션 적용
document.querySelectorAll('section, .card, .goal-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// 헤더 스크롤 효과
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.height = '70px';
        header.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
    } else {
        header.style.height = '100px';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// 이미지 로드 함수 (로컬 파일 보안 문제 해결)
function loadProfileImage() {
    const profileImage = document.getElementById('profileImage');
    if (!profileImage) return;
    
    // 여러 경로 시도
    const imagePaths = [
        'P.png',
        './P.png',
        '자기소개서/P.png',
        './자기소개서/P.png'
    ];
    
    let currentPathIndex = 0;
    
    function tryLoadImage() {
        if (currentPathIndex >= imagePaths.length) {
            // 모든 경로 실패 시 FileReader API 사용
            loadImageWithFileReader();
            return;
        }
        
        const img = new Image();
        img.onload = function() {
            profileImage.src = this.src;
            profileImage.style.opacity = '1';
            profileImage.style.visibility = 'visible';
        };
        img.onerror = function() {
            currentPathIndex++;
            tryLoadImage();
        };
        img.src = imagePaths[currentPathIndex];
    }
    
    // FileReader를 사용한 이미지 로드 (보안 문제 우회)
    function loadImageWithFileReader() {
        // 사용자에게 이미지 파일 선택 안내
        console.log('이미지 로드 실패. 로컬 서버를 사용하거나 이미지를 base64로 변환해주세요.');
        
        // 대체 이미지 표시 (SVG placeholder)
        profileImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjI4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNDAiIGN5PSIxNDAiIHI9IjEzMCIgZmlsbD0iIzExMjI0MCIgc3Ryb2tlPSIjNjRmZmRhIiBzdHJva2Utd2lkdGg9IjMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjRmZmRhIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+7J207KCg7ZWYPC90ZXh0Pjwvc3ZnPg==';
        profileImage.style.opacity = '0.5';
    }
    
    tryLoadImage();
}

// 페이지 로드 시 애니메이션
window.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
    
    // Hero 섹션 요소들이 확실히 보이도록 설정
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.visibility = 'visible';
    });
    
    // 헤더 프로필 이미지 로드 확인
    const headerProfileImage = document.querySelector('.header-profile-image');
    if (headerProfileImage) {
        headerProfileImage.onerror = function() {
            console.error('헤더 프로필 이미지 로드 실패:', this.src);
            // 대체 이미지나 플레이스홀더 표시
            this.style.display = 'none';
        };
        headerProfileImage.onload = function() {
            this.style.opacity = '1';
        };
    }
});

// 부드러운 스크롤을 위한 네비게이션
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // 활성 메뉴 업데이트
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// 스크롤 시 활성 메뉴 업데이트
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
