/**
 * NhaiTopik - Trang web học tiếng Hàn
 * Thiết kế Neobrutalist
 * Tệp JavaScript chính - Xử lý tất cả tương tác
 */

document.addEventListener('DOMContentLoaded', () => {
  // ============================================================
  // 1. CHUYỂN ĐỔI CHỦ ĐỀ (SÁNG / TỐI)
  // ============================================================

  /** Lấy chủ đề đã lưu hoặc mặc định là 'light' */
  const getSavedTheme = () => localStorage.getItem('ontopik-theme') || 'light';

  /** Áp dụng chủ đề lên phần tử gốc */
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ontopik-theme', theme);
    updateThemeIcon(theme);
  };

const updateThemeIcon = (theme) => {
  const themeToggleBtns = [
    document.getElementById('theme-toggle'),
    document.getElementById('theme-toggle-mobile')
  ];

  themeToggleBtns.forEach(btn => {
    if (!btn) return;
    if (theme === 'dark') {
      btn.innerHTML = `
        <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>`;
    } else {
      btn.innerHTML = `
        <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>`;
    }
  });
};
  /** Chuyển đổi giữa chế độ sáng và tối */
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  };

  // Áp dụng chủ đề đã lưu khi tải trang
  applyTheme(getSavedTheme());
  // Gắn sự kiện cho nút chuyển đổi chủ đề (cả Desktop và Mobile)
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
  if (themeToggleMobileBtn) {
    themeToggleMobileBtn.addEventListener('click', toggleTheme);
  }

  // Nút cài đặt cũng chuyển đổi chủ đề
  const settingsBtn = document.querySelector('#settings-btn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', toggleTheme);
  }

  // ============================================================
  // 2. THANH BÊN DI ĐỘNG (SIDEBAR)
  // ============================================================

  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const sidebarCloseBtn = document.getElementById('sidebar-close-btn');

  /** Mở thanh bên di động */
  const openSidebar = () => {
    if (!sidebar) return;
    sidebar.classList.add('open');
    if (sidebarOverlay) sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  /** Đóng thanh bên di động */
  const closeSidebar = () => {
    if (!sidebar) return;
    sidebar.classList.remove('open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openSidebar);
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

  // ============================================================
  // 3. MENU PHỤ CÓ THỂ THU GỌN (COLLAPSIBLE SUBMENUS)
  // ============================================================

  const expandableNavItems = document.querySelectorAll('.nav-item-expandable');

  expandableNavItems.forEach((navItem) => {
    navItem.addEventListener('click', (e) => {
      e.preventDefault();

      // Tìm menu phụ liền kề
      const submenu = navItem.nextElementSibling;
      if (!submenu || !submenu.classList.contains('nav-submenu')) return;

      // Chuyển đổi trạng thái mở/đóng
      const isOpen = submenu.classList.contains('open');

      if (isOpen) {
        // Thu gọn: đặt max-height về 0
        submenu.style.maxHeight = '0px';
        submenu.classList.remove('open');
        navItem.classList.remove('expanded');
      } else {
        // Mở rộng: đặt max-height bằng scrollHeight
        submenu.classList.add('open');
        navItem.classList.add('expanded');
        submenu.style.maxHeight = `${submenu.scrollHeight}px`;
      }
    });
  });

  // ============================================================
  // 4. MODAL ĐĂNG NHẬP
  // ============================================================

  const modalOverlay = document.querySelector('.modal-overlay');
  const loginBtn = document.getElementById('login-btn');
  const loginBtnMobile = document.getElementById('login-btn-mobile');
  const modalCloseBtn = document.querySelector('.modal-close');

  /** Mở modal đăng nhập */
  const openModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  /** Đóng modal đăng nhập */
  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (loginBtn) loginBtn.addEventListener('click', openModal);
  if (loginBtnMobile) loginBtnMobile.addEventListener('click', openModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  // Đóng modal khi nhấn vào nền
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Đóng modal khi nhấn phím Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('email');
      const emailValue = emailInput ? emailInput.value.trim() : '';

      if (emailValue) {
        showToast(`Đăng nhập thành công với: ${emailValue}!`, 'success');
        closeModal();
      } else {
        showToast('Vui lòng nhập địa chỉ Email!', 'warning');
      }
    });
  }
  // ============================================================
  // 5. THẺ HỌC - XỬ LÝ NHẤP CHUỘT
  // ============================================================

    const studyCards = document.querySelectorAll('.study-card');

  studyCards.forEach((card) => {
    card.addEventListener('click', () => {
      // Lấy tiêu đề thẻ học
      const titleEl = card.querySelector('.study-card-title, h3, h4');
      const title = titleEl ? titleEl.textContent.trim() : 'bài học';
      
      // Đồng thời kích hoạt class active cho menu tương ứng ở thanh bên
      if (typeof navItems !== 'undefined') {
        let matchedNavItem = null;
        navItems.forEach(item => {
          const spanText = item.querySelector('span');
          const itemText = spanText ? spanText.textContent.trim() : item.textContent.trim();
          if (itemText.toLowerCase() === title.toLowerCase()) {
            matchedNavItem = item;
          }
        });

        if (matchedNavItem) {
          navItems.forEach(link => link.classList.remove('active'));
          matchedNavItem.classList.add('active');
          
          // Mở rộng menu cha nếu menu tương ứng nằm trong submenu
          const parentSubmenu = matchedNavItem.closest('.nav-submenu');
          if (parentSubmenu) {
            parentSubmenu.classList.add('open');
            parentSubmenu.style.maxHeight = `${parentSubmenu.scrollHeight}px`;
            const parentExpandable = parentSubmenu.previousElementSibling;
            if (parentExpandable && parentExpandable.classList.contains('nav-item-expandable')) {
              parentExpandable.classList.add('expanded');
            }
          }
        }
      }

      // Gọi hàm hiển thị giao diện động
      if (typeof showDynamicPage === 'function') {
        showDynamicPage(title);
      }
    });

    // Thêm con trỏ pointer cho thẻ
    card.style.cursor = 'pointer';
  });
  // ============================================================
  // 6. MỤC ÔN TẬP - LẬT THẺ
  // ============================================================

  const reviewItems = document.querySelectorAll('.review-item');

  reviewItems.forEach((item) => {
    item.addEventListener('click', () => {
      // Chuyển đổi lớp 'flipped' để hiển thị nghĩa nổi bật hơn
      item.classList.toggle('flipped');
    });
  });

  // ============================================================
  // 7. HIỆU ỨNG THANH TIẾN TRÌNH (PROGRESS BAR)
  // ============================================================

  const progressBars = document.querySelectorAll('.study-card-progress-bar');

  if (progressBars.length > 0) {
    /** Sử dụng IntersectionObserver để kích hoạt hiệu ứng khi nhìn thấy */
    const progressObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.getAttribute('data-progress') || '0';

            // Bắt đầu từ 0 rồi mở rộng đến giá trị mục tiêu
            bar.style.width = '0%';
            bar.style.transition = 'width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

            // Dùng requestAnimationFrame để đảm bảo trình duyệt đã render width: 0
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                bar.style.width = `${targetWidth}%`;
              });
            });

            // Ngừng quan sát sau khi đã kích hoạt
            progressObserver.unobserve(bar);
          }
        });
      },
      { threshold: 0.3 }
    );

    progressBars.forEach((bar) => progressObserver.observe(bar));
  }

  // ============================================================
  // 8. HIỆU ỨNG ĐẾM SỐ STREAK
  // ============================================================

  const streakNumbers = document.querySelectorAll('.streak-number');

  /**
   * Hiệu ứng đếm số từ 0 đến giá trị mục tiêu
   * Sử dụng requestAnimationFrame cho hiệu ứng mượt mà
   */
  const animateCounter = (element, target, duration = 1500) => {
    const start = performance.now();
    const startValue = 0;

    const step = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      // Hàm easing - tạo hiệu ứng chậm dần ở cuối
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);

      element.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(step);
  };

  if (streakNumbers.length > 0) {
    const streakObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const targetNumber = parseInt(el.textContent, 10) || 0;

            // Chỉ chạy hiệu ứng nếu có số hợp lệ
            if (targetNumber > 0) {
              animateCounter(el, targetNumber);
            }

            streakObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    streakNumbers.forEach((el) => streakObserver.observe(el));
  }

  // ============================================================
  // 9. CUỘN MƯỢT (SMOOTH SCROLL)
  // ============================================================

  /** Xử lý cuộn mượt cho tất cả liên kết neo */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');

      // Bỏ qua nếu href chỉ là '#'
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // ============================================================
  // 9.5. HIỆU ỨNG ĐẾM SỐ THỐNG KÊ (STAT COUNTERS)
  // ============================================================

  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  if (statNumbers.length > 0) {
    /** Hiệu ứng đếm số cho thống kê welcome banner */
    const animateStatCounter = (el, target) => {
      const duration = 1500;
      const start = performance.now();

      const step = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: easeOutExpo
        const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentValue = Math.floor(easedProgress * target);
        el.textContent = currentValue.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString();
        }
      };

      requestAnimationFrame(step);
    };

    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10);
            if (target > 0) {
              animateStatCounter(el, target);
            }
            statObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach((el) => statObserver.observe(el));
  }

  // ============================================================
  // 10. HỆ THỐNG THÔNG BÁO TOAST
  // ============================================================

  /** Sử dụng toast container đã có sẵn trong HTML */
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  /**
   * Hiển thị thông báo toast
   * @param {string} message - Nội dung thông báo
   * @param {'info'|'success'|'warning'} type - Loại thông báo
   */
  const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    // Chọn icon theo loại
    const icons = { info: 'ℹ️', success: '✅', warning: '⚠️' };
    const icon = icons[type] || icons.info;

    toast.innerHTML = `<span style="font-size:18px">${icon}</span><span>${message}</span>`;

    // Nhấp để đóng toast
    toast.addEventListener('click', () => dismissToast(toast));

    toastContainer.appendChild(toast);

    // Tự động ẩn sau 3 giây
    setTimeout(() => dismissToast(toast), 3000);
  };

  /** Ẩn và xóa toast với hiệu ứng */
  const dismissToast = (toast) => {
    toast.classList.add('toast-hiding');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 350);
  };

  // Gắn hàm showToast vào window để có thể gọi từ bất kỳ đâu
  window.showToast = showToast;

  // Hiển thị thông báo chào mừng sau 1 giây
  setTimeout(() => {
    showToast('Chào mừng bạn đến với OnTopik! 🇰🇷', 'success');
  }, 1000);

  // ============================================================
  // 11. PHÍM TẮT (KEYBOARD SHORTCUTS)
  // ============================================================

  document.addEventListener('keydown', (e) => {
    // Ctrl+K hoặc Cmd+K: Tập trung vào ô tìm kiếm
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();

      const searchInput = document.querySelector(
        'input[type="search"], input[name="search"], .search-input, #search-input'
      );

      if (searchInput) {
        searchInput.focus();
        showToast('Đang tìm kiếm...', 'info');
      } else {
        showToast('Tính năng tìm kiếm sắp ra mắt! 🔍', 'info');
      }
    }

    // Alt+T: Chuyển đổi chủ đề
    if (e.altKey && e.key === 't') {
      e.preventDefault();
      toggleTheme();

      const currentTheme = document.documentElement.getAttribute('data-theme');
      showToast(
        currentTheme === 'dark' ? 'Chế độ tối đã bật 🌙' : 'Chế độ sáng đã bật ☀️',
        'info'
      );
    }
  });

  // ============================================================
  // 12. LOG KHỞI TẠO
  // ============================================================

  console.log(
    '%c🇰🇷 OnTopik %c Đã khởi tạo thành công!',
    'background: #0094FF; color: #fff; padding: 4px 8px; font-weight: bold; border: 2px solid #000;',
    'background: #FFD93D; color: #000; padding: 4px 8px; font-weight: bold; border: 2px solid #000;'
  );
    // ============================================================
  // 13. HỆ THỐNG CHUYỂN TRANG ĐỘNG (DYNAMIC VIEW SWITCHER)
  // ============================================================
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item, .nav-sub-item');
  const mainContentLayout = document.querySelector('.content-layout');
  const contentContainer = document.querySelector('.content-container');

  const showDynamicPage = (pageTitle) => {
    let dynamicContainer = document.getElementById('dynamic-content-container');
    if (!dynamicContainer) {
      dynamicContainer = document.createElement('div');
      dynamicContainer.id = 'dynamic-content-container';
      if (contentContainer) contentContainer.appendChild(dynamicContainer);
    }

    if (mainContentLayout) mainContentLayout.style.display = 'none';
    dynamicContainer.style.display = 'block';

    // Sinh giao diện mẫu đẹp cho từng trang tương ứng
    let pageContent = '';
    if (pageTitle === 'Lộ trình') {
      pageContent = `
        <div class="card" style="padding: 24px; background: var(--color-card);">
          <h2 style="font-size: 24px; margin-bottom: 8px;">📍 Lộ Trình Học Tiếng Hàn</h2>
          <p style="color: var(--color-text-muted); margin-bottom: 24px;">Lộ trình chi tiết giúp bạn chinh phục TOPIK từ con số 0.</p>
          <div style="display: flex; flex-direction: column; gap: 16px; position: relative; padding-left: 20px; border-left: 3px dashed var(--color-main);">
            <div class="card" style="padding: 16px; position: relative;">
              <span style="position: absolute; left: -33px; top: 12px; width: 22px; height: 22px; background: var(--color-main); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold; border: 2px solid var(--color-border);">1</span>
              <h3 style="font-size: 16px; font-weight: 700;">Nhập môn tiếng Hàn (Phát âm & Chữ cái)</h3>
              <p style="font-size: 13px; color: var(--color-text-muted); margin-top: 4px;">Học bảng chữ cái Hangul, cách ghép vần và phát âm chuẩn.</p>
            </div>
            <div class="card" style="padding: 16px; position: relative;">
              <span style="position: absolute; left: -33px; top: 12px; width: 22px; height: 22px; background: var(--color-accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: black; font-size: 12px; font-weight: bold; border: 2px solid var(--color-border);">2</span>
              <h3 style="font-size: 16px; font-weight: 700;">Sơ cấp (TOPIK I)</h3>
              <p style="font-size: 13px; color: var(--color-text-muted); margin-top: 4px;">Tích lũy 800+ từ vựng và ngữ pháp cơ bản để giao tiếp đơn giản.</p>
            </div>
            <div class="card" style="padding: 16px; position: relative;">
              <span style="position: absolute; left: -33px; top: 12px; width: 22px; height: 22px; background: var(--color-success); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold; border: 2px solid var(--color-border);">3</span>
              <h3 style="font-size: 16px; font-weight: 700;">Trung cấp (TOPIK II)</h3>
              <p style="font-size: 13px; color: var(--color-text-muted); margin-top: 4px;">Luyện đọc hiểu, nghe hiểu nâng cao và luyện viết luận văn mẫu.</p>
            </div>
          </div>
        </div>`;
    } else {
      pageContent = `
        <div class="card" style="padding: 40px; text-align: center; background: var(--color-card);">
          <div style="font-size: 48px; margin-bottom: 16px;">🚀</div>
          <h2 style="font-size: 24px; margin-bottom: 8px;">Trang "${pageTitle}" đang phát triển</h2>
          <p style="color: var(--color-text-muted); max-width: 400px; margin: 0 auto 24px;">Tính năng và bài học của phần này hiện đang được thiết kế. Vui lòng quay lại sau!</p>
          <button class="btn btn-primary" id="back-to-home-btn" style="cursor: pointer;">Quay lại Trang chủ</button>
        </div>`;
    }

    dynamicContainer.innerHTML = pageContent;

    const backBtn = document.getElementById('back-to-home-btn');
    if (backBtn) {
      backBtn.addEventListener('click', showHomePage);
    }
  };

  const showHomePage = () => {
    const dynamicContainer = document.getElementById('dynamic-content-container');
    if (dynamicContainer) dynamicContainer.style.display = 'none';
    if (mainContentLayout) mainContentLayout.style.display = 'flex';

    navItems.forEach(item => item.classList.remove('active'));
    const homeNav = document.getElementById('nav-home');
    if (homeNav) homeNav.classList.add('active');
  };

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (item.classList.contains('nav-item-expandable')) return;

      e.preventDefault();

      navItems.forEach(link => link.classList.remove('active'));
      item.classList.add('active');

      if (typeof closeSidebar === 'function') closeSidebar();

      const spanText = item.querySelector('span');
      const pageTitle = spanText ? spanText.textContent.trim() : item.textContent.trim();

      if (pageTitle === 'Trang chủ') {
        showHomePage();
      } else {
        showDynamicPage(pageTitle);
      }
    });
   });
});
