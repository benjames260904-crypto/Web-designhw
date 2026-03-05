// ===== CONFIG =====
const API_URL = 'https://69a794142cd1d05526910720.mockapi.io/rooms';

// ===== STATE =====
let isDisplayVisible = false;

// ===== IMAGE HANDLING =====
function handleImageSelect(input) {
    const file = input.files[0];
    if (!file) return;
    document.getElementById('imageName').textContent = file.name;
}

// ===== ADD ROOM =====
async function addRoom() {
    const name = document.getElementById('roomName').value.trim();
    const description = document.getElementById('roomDesc').value.trim();
    const price = document.getElementById('roomPrice').value.trim();

    if (!name || !description || !price) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }

    const roomData = {
        name: name,
        description: description,
        price: Number(price),
        image: 'images/room1.png',
        rating: 5,
        reviews: 25,
        available: 30,
        booked: 120
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(roomData)
        });

        if (!response.ok) {
            throw new Error('Lỗi khi thêm phòng');
        }

        alert('Đã thêm phòng "' + name + '" thành công!');

        document.getElementById('roomName').value = '';
        document.getElementById('roomDesc').value = '';
        document.getElementById('roomPrice').value = '';
        document.getElementById('roomImage').value = '';
        document.getElementById('imageName').textContent = '';

        if (isDisplayVisible) {
            displayRooms();
        }

    } catch (error) {
        alert('Không thể kết nối API! Hãy chắc chắn json-server đang chạy.');
    }
}

// ===== TOGGLE DISPLAY =====
function toggleDisplay() {
    const displaySection = document.getElementById('displaySection');

    if (isDisplayVisible) {
        displaySection.style.display = 'none';
        isDisplayVisible = false;
    } else {
        displaySection.style.display = 'block';
        isDisplayVisible = true;
        displayRooms();
    }
}

// ===== DISPLAY ROOMS =====
async function displayRooms() {
    const grid = document.getElementById('roomsGrid');
    grid.innerHTML = '';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Lỗi khi tải dữ liệu');

        const rooms = await response.json();

        rooms.forEach(function (room) {
            const card = createRoomCard(room);
            grid.appendChild(card);
        });

    } catch (error) {
        alert('Không thể tải dữ liệu! Hãy chắc chắn json-server đang chạy.');
    }
}

// ===== CREATE ROOM CARD =====
function createRoomCard(room) {
    const card = document.createElement('div');
    card.className = 'room-card';

    const starsHTML = generateStars(room.rating || 5);
    const formattedPrice = Number(room.price).toLocaleString('vi-VN');

    card.innerHTML =
        '<div class="card-image-wrapper">' +
        '<img src="' + room.image + '" alt="' + room.name + '">' +
        '<div class="heart-icon">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e65100" stroke-width="2">' +
        '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>' +
        '</svg>' +
        '</div>' +
        '</div>' +
        '<div class="card-body">' +
        '<div class="card-rating">' +
        '<div class="stars">' + starsHTML + '</div>' +
        '<span class="review-count">' + (room.reviews || 25) + ' Review</span>' +
        '</div>' +
        '<div class="card-title">' + room.name + '</div>' +
        '<div class="card-desc">' + room.description + '</div>' +
        '<div class="card-price-label">Giá tiền</div>' +
        '<div class="card-price">' + formattedPrice + ' đ</div>' +
        '<div class="card-availability">' +
        '<span>Còn ' + (room.available || 30) + ' phòng</span>' +
        '<span>📋 ' + (room.booked || 120) + ' đã đặt</span>' +
        '</div>' +
        '<button class="btn-book">' +
        'Đặt Ngay' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">' +
        '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>' +
        '</svg>' +
        '</button>' +
        '</div>';

    return card;
}

// ===== GENERATE STARS =====
function generateStars(rating) {
    let html = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            html += '<span class="star">★</span>';
        } else {
            html += '<span class="star" style="color:#e0e0e0;">★</span>';
        }
    }
    return html;
}
