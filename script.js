
// Decoded version of hh.js
// This appears to be a 3D heart animation with text and QR code generation

const style = document.createElement('style');
style.textContent = `
        html,
        body {
            height: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #1e2a38, #16202b);
            color: #cfd8dc;
            font-family: "Playpen Sans", cursive;
            overflow: hidden;
        }

        #ui {
            position: fixed;
            top: 50%;
            left: 50%;
            width: 320px;
            transform: translate(-50%, -50%);
            padding: 15px 20px;
            border-radius: 12px;
            z-index: 1000;
            backdrop-filter: blur(8px);
            box-sizing: border-box;
            max-height: 90vh;
            overflow-y: scroll;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        #ui::-webkit-scrollbar {
            display: none;
        }

        #ui label {
            font-weight: 600;
            font-size: 15px;
            display: block;
            margin-bottom: 6px;
        }

        #ui textarea {
            width: 95%;
            height: 70px;
            margin-bottom: 12px;
            background: #1b1b1b;
            border: 1px solid #3d3d3d;
            color: #ddd;
            font-size: 14px;
            resize: vertical;
            padding: 10px 12px;
            border-radius: 8px;
            font-family: "Courier New", Courier, monospace;
            transition: border-color 0.3s ease;
        }

        #ui textarea:focus {
            border-color: #66aaff;
            outline: none;
            background: #222;
        }

        #ui h1 {
            text-align: center;
        }

        #musicSelector {
            width: 100%;
            padding: 10px 14px;
            font-size: 15px;
            border-radius: 12px;
            border: none;
            background: #223344;
            color: #e0e6f3;
            text-align-last: center;
            text-align: center;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.6);
            margin-bottom: 15px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        #musicSelector:hover {
            background-color: #2a3b56;
        }

        #buttonContainer {
            display: flex;
            gap: 12px;
        }

        #startBtn,
        #qrBtn {
            font-family: "Playpen Sans", cursive;
            flex: 1;
            padding: 12px 0;
            background: #4a90e2;
            border: none;
            color: white;
            font-weight: 700;
            font-size: 17px;
            cursor: pointer;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(74, 144, 226, 0.6);
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        #startBtn:hover {
            background: #6aa0ff;
            box-shadow: 0 8px 25px rgba(106, 160, 255, 0.8);
        }

        #shareLink {
            display: inline-block;
            max-width: 250px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            vertical-align: bottom;
            color: #42a5f5;
            cursor: pointer;
            text-decoration: underline;
            font-size: 15px;
            user-select: all;
            margin-top: 10px;
            text-align: center;
        }

        .heart-frame {
            position: relative;
            margin: 20px auto;
        }

        #finalCanvas {
            cursor: pointer;
            display: block;
            margin: 0 auto;
            border-radius: 12px;
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
        }

        .info-text {
            text-align: center;
            color: #ff679a;
            font-size: 12px;
            margin-top: 5px;
        }

        textarea {
            width: 300px;
            height: 150px;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #cccccc00;
            border-radius: 5px;
            resize: both;
        }

        textarea::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }

        textarea::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 5px;
            border: 2px solid #ffffff00;
        }

        textarea::-webkit-scrollbar-thumb:hover {
            background-color: #555;
        }

        textarea::-webkit-scrollbar-track {
            background-color: #f1f1f100;
            border-radius: 5px;
        }

        .custom-upload-button {
            font-family: "Playpen Sans", cursive;
            display: block;
            margin: 10px auto;
            padding: 12px 24px;
            background-color: #4a90e2;
            color: white;
            border-radius: 6px;
            font-weight: bold;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            user-select: none;
            text-align: center;
            width: 40%;
        }

        #downloadBtn {
            font-family: "Playpen Sans", cursive;
            display: block;
            margin: 12px auto 0 auto;
            background-color: #ff7094;
            color: #fff;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: bold;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s ease, transform 0.2s ease;
        }

        #downloadBtn:hover {
            background-color: #ff5682;
            transform: translateY(-2px);
        }

        #downloadBtn:active {
            transform: scale(0.98);
        }

        #captcha-popup {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }

        #captcha-popup>div {
            background: white;
            padding: 25px 30px;
            border-radius: 10px;
            max-width: 320px;
            width: 90%;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        #captcha-code {
            font-family: "Playpen Sans", cursive;
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 5px;
            background: #4a90e2;
            padding: 10px 20px;
            user-select: none;
            border-radius: 6px;
        }

        #refresh-captcha {
            margin-left: 10px;
            padding: 6px 12px;
            border: none;
            border-radius: 6px;
            background: #4a90e2;
            color: white;
            cursor: pointer;
        }

        #captcha-input {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #4a90e2;
            border-radius: 6px;
            margin-top: 15px;
            box-sizing: border-box;
        }

        #captcha-error {
            color: red;
            margin-top: 10px;
            min-height: 20px;
        }

        #captcha-submit {
            margin-top: 20px;
            background: #4a90e2;
            color: white;
            border: none;
            border-radius: 6px;
            padding: 10px 20px;
            font-weight: bold;
            cursor: pointer;
            font-family: "Playpen Sans", cursive;
        }

        #loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            font-size: 24px;
            color: #555;
            flex-direction: column;
        }

        /* Donate Button */
        #donateBtn {
            font-family: "Playpen Sans", cursive;
            padding: 10px 24px;
            background-color: #ff7094;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 4px 10px rgba(255, 112, 148, 0.5);
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
            display: block;
            margin: 10px auto;
            width: max-content;
            text-align: center;
        }

        #donateBtn:hover {
            background-color: #e85c7a;
            box-shadow: 0 6px 15px rgba(232, 92, 122, 0.7);
        }
`;

document.head.appendChild(style);

// Donate modal elements
const donateBtn = document.getElementById('donateBtn');
const donateModal = document.getElementById('donateModal');
const closeDonateModal = document.getElementById('closeDonateModal');
const donateQRImg = document.getElementById('donateQRImg');
const qrDonateLink = 'https://files.catbox.moe/gt5se9.png';

// Donate button event handlers
donateBtn.addEventListener('click', () => {
    donateQRImg.src = qrDonateLink;
    donateModal.style.display = 'flex';
});

closeDonateModal.addEventListener('click', () => {
    donateModal.style.display = 'none';
});

donateModal.addEventListener('click', (event) => {
    if (event.target === donateModal) {
        donateModal.style.display = 'none';
    }
});

// Set placeholder text
document.getElementById('imageLinks').placeholder = 'Ví dụ:\nhttps://example.com/image1.png\nhttps://example.com/image2.png\nNhập 1 chữ bất kỳ để bỏ qua ảnh';

// Data encoding/decoding functions
const encodeData = (data) => btoa(encodeURIComponent(data).replace(/%(\w{2})/g, (match, hex) => String.fromCharCode('0x' + hex))).replace(/[+/=]/g, char => ({'+': '-', '/': '_', '=': ''}[char] || ''));

const decodeData = (encodedData) => {
    // Replace URL-safe characters back
    encodedData = encodedData.replace(/[-_]/g, char => ({'-': '+', '_': '/'}[char]));
    
    // Add padding if needed
    while (encodedData.length % 4) {
        encodedData += '=';
    }
    
    return decodeURIComponent(atob(encodedData).split('').map(char => '%' + char.charCodeAt(0).toString(16).padStart(2, '0')).join(''));
};

// Get data from URL hash
function getDataFromURL() {
    if (location.hash.startsWith('#id=')) {
        const encodedData = location.hash.slice(4);
        const decodedData = decodeData(encodedData);
        if (decodedData) {
            try {
                return JSON.parse(decodedData);
            } catch (error) {
                console.error('JSON parse error:', error);
                return null;
            }
        }
    }
    return null;
}

// DOM elements
const inputTextEl = document.getElementById('inputText');
const imageLinksEl = document.getElementById('imageLinks');
const startBtn = document.getElementById('startBtn');
const shareLinkEl = document.getElementById('shareLink');
const qrBtn = document.getElementById('qrBtn');
const heartFrame = document.querySelector('.heart-frame');
const canvas = document.getElementById('finalCanvas');
const ctx = canvas.getContext('2d');
const musicSelector = document.getElementById('musicSelector');

let audio = null;

// Music functions
function waitUserToStartMusic(musicUrl) {
    const startMusic = () => {
        playMusic(musicUrl);
        document.removeEventListener('click', startMusic);
        document.removeEventListener('touchstart', startMusic);
    };
    
    document.addEventListener('click', startMusic);
    document.addEventListener('touchstart', startMusic);
}

function playMusic(musicUrl) {
    if (audio) {
        audio.pause();
        audio = null;
    }
    
    if (musicUrl) {
        audio = new Audio(musicUrl);
        audio.loop = true;
        audio.volume = 0.5;
        audio.play().catch(error => {
            console.warn('Không thể phát nhạc tự động:', error);
        });
    }
}

// URL parameter functions
function updateURLParam(param, value) {
    const url = new URL(window.location);
    if (value) {
        url.searchParams.set(param, value);
    } else {
        url.searchParams.delete(param);
    }
    window.history.replaceState({}, '', url);
}

// Music selector event
musicSelector.addEventListener('change', () => {
    const selectedMusic = musicSelector.value;
    updateURLParam('music', selectedMusic);
    playMusic(selectedMusic);
});

// Load music from URL on page load
window.addEventListener('load', () => {
    const urlData = getDataFromURL();
    if (urlData && urlData.music) {
        musicSelector.value = urlData.music;
        waitUserToStartMusic(urlData.music);
    }
});

// Three.js scene setup
let images = [];
let textLines = [];

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.z = 400;

const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create starfield
const starGeo = new THREE.BufferGeometry();
const starCount = 800;
const starPos = [];

for (let i = 0; i < starCount; i++) {
    const radius = THREE.MathUtils.randFloat(900, 1200);
    const u = Math.acos(THREE.MathUtils.randFloat(2));
    const v = THREE.MathUtils.randFloat(2 * Math.PI);
    
    starPos.push(
        radius * Math.sin(u) * Math.cos(v),
        radius * Math.sin(u) * Math.sin(v),
        radius * Math.cos(u)
    );
}

starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));

const starsMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 5,
    transparent: true,
    opacity: 0.9
});

scene.add(new THREE.Points(starGeo, starsMat));

// Store star positions for shooting stars
const starPositions = [];
for (let i = 0; i < starCount; i++) {
    starPositions.push(new THREE.Vector3(starPos[3*i], starPos[3*i+1], starPos[3*i+2]));
}

// Create shooting stars
const shootingStars = [];
const shootingStarCount = 5;

for (let i = 0; i < shootingStarCount; i++) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(30); // 10 points * 3 coordinates
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9
    });
    
    const line = new THREE.Line(geometry, material);
    const pos = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(1000),
        THREE.MathUtils.randFloat(400, 700),
        THREE.MathUtils.randFloat(1000)
    );
    const velocity = new THREE.Vector3(0.8, -1, 0.2).normalize().multiplyScalar(5 + 5 * Math.random());
    
    shootingStars.push({
        line: line,
        positions: positions,
        pos: pos,
        velocity: velocity
    });
    
    scene.add(line);
}

// Create shooting stars from existing stars
const shootingStarsFromStars = [];
const shootingStarCountFromStars = 30;

for (let i = 0; i < shootingStarCountFromStars; i++) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(30);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9
    });
    
    const line = new THREE.Line(geometry, material);
    const randomIndex = Math.floor(Math.random() * starPositions.length);
    const pos = starPositions[randomIndex].clone();
    const velocity = pos.clone().normalize().clone().add(new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(0.5),
        THREE.MathUtils.randFloat(0.5),
        THREE.MathUtils.randFloat(0.5)
    )).normalize().multiplyScalar(5 + 5 * Math.random());
    
    shootingStarsFromStars.push({
        line: line,
        positions: positions,
        pos: pos,
        velocity: velocity
    });
    
    scene.add(line);
}

// Reset images array
images = [];

const textureLoader = new THREE.TextureLoader();
const group = new THREE.Group();

// Helper function to get random position on sphere
function randomPosOnSphere(radius) {
    const u = Math.acos(THREE.MathUtils.randFloat(2));
    const v = THREE.MathUtils.randFloat(2 * Math.PI);
    
    return new THREE.Vector3(
        radius * Math.sin(u) * Math.cos(v),
        radius * Math.sin(u) * Math.sin(v),
        radius * Math.cos(u)
    );
}

// Create text sprite function
function createTextSprite(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    
    const context = canvas.getContext('2d');
    const colors = ['#ff8690', '#76b776', '#63c7c7'];
    const strokeColors = ['#cfd8dc', '#cfd8dc', '#cfd8dc'];
    
    let colorIndex = 0;
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    
    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        emissive: new THREE.Color(0xbfe6ff),
        emissiveIntensity: 1.5
    });
    
    const sprite = new THREE.Sprite(material);
    
    function updateCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = 'bold 72px Playpen Sans';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = colors[colorIndex];
        context.lineWidth = 2;
        context.strokeStyle = strokeColors[colorIndex];
        context.strokeText(text, 256, 64);
        context.fillText(text, 256, 64);
        texture.needsUpdate = true;
    }
    
    sprite.scale.set(150, 40, 1);
    updateCanvas();
    
    // Change color every 10 seconds
    setInterval(() => {
        colorIndex = (colorIndex + 1) % colors.length;
        updateCanvas();
    }, 10000);
    
    // Load font and update canvas
    document.fonts.load('48px Playpen Sans').then(() => {
        updateCanvas();
    });
    
    return sprite;
}

scene.add(group);

// Arrays to store objects
const planes = [];
const labels = [];
const imagePositions = [];
const textPositions = [];
const boxCount = 50;
const radiusImage = 400;
const radiusText = 600;

// Initialize scene function
function initScene() {
    // Clear existing objects
    group.clear();
    planes.length = 0;
    labels.length = 0;
    imagePositions.length = 0;
    textPositions.length = 0;
    
    if (images.length === 0 && textLines.length === 0) return;
    
    // Create image planes
    for (let i = 0; i < boxCount; i++) {
        const size = 20 + 10 * Math.random();
        const geometry = new THREE.PlaneGeometry(size, size);
        
        const texture = textureLoader.load(images[i % images.length], (loadedTexture) => {
            loadedTexture.minFilter = THREE.LinearMipMapLinearFilter;
            loadedTexture.magFilter = THREE.LinearFilter;
            loadedTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        });
        
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        const position = randomPosOnSphere(radiusImage);
        
        imagePositions.push(position);
        mesh.position.set(0, 0, 0);
        mesh.scale.set(0.05, 0.05, 0.05);
        mesh.userData = {
            progress: 0,
            speed: 0.0005 + 0.001 * Math.random(),
            delayOffset: 0.02 * i
        };
        
        group.add(mesh);
        planes.push(mesh);
    }
    
    // Create text labels
    for (let i = 0; i < 2 * boxCount; i++) {
        const textSprite = createTextSprite(textLines[i % textLines.length]);
        const position = randomPosOnSphere(radiusText);
        
        textPositions.push(position);
        textSprite.position.set(0, 0, 0);
        textSprite.scale.set(1.5, 0.4, 1);
        textSprite.userData = {
            progress: 0,
            speed: 0.0005 + 0.001 * Math.random(),
            delayOffset: 0.02 * i
        };
        
        scene.add(textSprite);
        labels.push(textSprite);
    }
}

// Update label text function
function updateLabelText(index, newText) {
    if (index < 0 || index >= labels.length) return;
    
    const existingLabel = labels[index];
    if (existingLabel) {
        scene.remove(existingLabel);
        existingLabel.material.map.dispose();
        existingLabel.material.dispose();
    }
    
    if (newText.trim() === '') {
        labels[index] = null;
        return;
    }
    
    const newLabel = createTextSprite(newText);
    newLabel.position.copy(textPositions[index]);
    scene.add(newLabel);
    labels[index] = newLabel;
}

initScene();

// Mouse/touch interaction variables
let targetRotX = 0;
let targetRotY = 0;
let currentRotX = 0;
let currentRotY = 0;

const maxRotX = Math.PI / 180 * 90; // 90 degrees
const maxRotY = 2 * Math.PI; // 360 degrees

function updateTargetRotation(mouseX, mouseY) {
    const normalizedX = (mouseX / window.innerWidth) * 2 - 1;
    const normalizedY = (mouseY / window.innerHeight) * 2 - 1;
    
    targetRotY = normalizedX * maxRotY;
    targetRotX = normalizedY * maxRotX;
}

// Share link function
function updateShareLink(textLines, imageLinks, music) {
    const data = {
        textLines: textLines,
        imageLinks: imageLinks,
        music: music
    };
    
    const jsonString = JSON.stringify(data);
    const encodedData = encodeData(jsonString);
    const url = new URL(location.origin + '/loinhan.html');
    url.hash = 'id=' + encodedData;
    
    shareLinkEl.href = url.toString();
    shareLinkEl.textContent = url.toString();
    shareLinkEl.title = 'Click để mở link trong tab mới';
    shareLinkEl.style.display = 'inline-block';
}

// Load from URL function
function loadFromURL() {
    const urlData = getDataFromURL();
    if (!urlData) return false;
    
    if (urlData.textLines) {
        textLines = urlData.textLines;
        inputTextEl.value = textLines.join('\n');
    }
    
    if (urlData.imageLinks) {
        images = urlData.imageLinks;
        imageLinksEl.value = images.join('\n');
    }
    
    if (urlData.music) {
        console.log('Nhạc từ URL:', urlData.music);
        musicSelector.value = urlData.music;
        playMusic(urlData.music);
    } else {
        console.log('Không có music trong data');
    }
    
    initScene();
    
    // Update text labels
    for (let i = 0; i < 2 * planes.length; i++) {
        let text = '';
        if (textLines.length > 0) {
            text = textLines[i % textLines.length];
        }
        updateLabelText(i, text);
    }
    
    updateShareLink(textLines, images, urlData.music);
    return true;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Smooth camera rotation
    currentRotX += 0.005 * (targetRotX - currentRotX);
    currentRotY += 0.005 * (targetRotY - currentRotY);
    
    // Update camera position
    camera.position.x = 600 * Math.sin(currentRotY) * Math.cos(currentRotX);
    camera.position.y = 600 * Math.sin(currentRotX);
    camera.position.z = 600 * Math.cos(currentRotY) * Math.cos(currentRotX);
    camera.lookAt(0, 0, 0);
    
    const fallDistance = 1000;
    
    // Make planes face camera
    planes.forEach(plane => {
        plane.lookAt(camera.position);
    });
    
    // Animate planes
    planes.forEach((plane, index) => {
        let progress = plane.userData.progress - plane.userData.delayOffset;
        if (progress < 0) progress = 0;
        else if (progress > 1) progress = 1;
        
        const startPos = imagePositions[index].clone();
        startPos.y -= 400;
        const endPos = new THREE.Vector3(startPos.x, fallDistance, startPos.z);
        
        plane.position.lerpVectors(endPos, startPos, progress);
        
        let scale = 0.05 + 1.95 * progress;
        plane.scale.set(scale, scale, scale);
        plane.up.set(0, 1, 0);
        plane.lookAt(camera.position);
        
        plane.userData.progress += plane.userData.speed;
        if (plane.userData.progress > 1 + plane.userData.delayOffset) {
            plane.userData.progress = 0;
        }
        
        // Update corresponding labels
        const label1 = labels[2 * index];
        if (label1) {
            label1.visible = progress > 0.05;
            const labelStartPos = textPositions[2 * index].clone();
            labelStartPos.y -= 400;
            const labelEndPos = new THREE.Vector3(labelStartPos.x, fallDistance, labelStartPos.z);
            label1.position.lerpVectors(labelEndPos, labelStartPos, progress);
        }
        
        const label2 = labels[2 * index + 1];
        if (label2) {
            label2.visible = progress > 0.05;
            const labelStartPos = textPositions[2 * index + 1].clone();
            labelStartPos.y -= 400;
            const labelEndPos = new THREE.Vector3(labelStartPos.x, fallDistance, labelStartPos.z);
            label2.position.lerpVectors(labelEndPos, labelStartPos, progress);
        }
    });
    
    // Animate shooting stars
    shootingStars.forEach(star => {
        star.pos.add(star.velocity);
        
        for (let i = 0; i < 10; i++) {
            const index = 3 * i;
            star.positions[index] = star.pos.x - star.velocity.x * i * 0.8;
            star.positions[index + 1] = star.pos.y - star.velocity.y * i * 0.8;
            star.positions[index + 2] = star.pos.z - star.velocity.z * i * 0.8;
        }
        
        star.line.geometry.attributes.position.needsUpdate = true;
        
        if (star.pos.y < -500) {
            star.pos.set(
                THREE.MathUtils.randFloat(1000),
                THREE.MathUtils.randFloat(400, 700),
                THREE.MathUtils.randFloat(1000)
            );
        }
    });
    
    // Animate shooting stars from stars
    shootingStarsFromStars.forEach(star => {
        star.pos.add(star.velocity);
        
        for (let i = 0; i < 10; i++) {
            const index = 3 * i;
            star.positions[index] = star.pos.x - star.velocity.x * i * 0.5;
            star.positions[index + 1] = star.pos.y - star.velocity.y * i * 0.5;
            star.positions[index + 2] = star.pos.z - star.velocity.z * i * 0.5;
        }
        
        star.line.geometry.attributes.position.needsUpdate = true;
        
        if (star.pos.length() > 1300) {
            const randomIndex = Math.floor(Math.random() * starPositions.length);
            star.pos.copy(starPositions[randomIndex]);
            const direction = star.pos.clone().normalize();
            star.velocity.copy(direction.add(new THREE.Vector3(
                THREE.MathUtils.randFloat(0.5),
                THREE.MathUtils.randFloat(0.5),
                THREE.MathUtils.randFloat(0.5)
            )).normalize().multiplyScalar(5 + 5 * Math.random()));
        }
    });
    
    renderer.render(scene, camera);
}

// Event listeners
window.addEventListener('mousemove', (event) => {
    updateTargetRotation(event.clientX, event.clientY);
});

window.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
        const touch = event.touches[0];
        updateTargetRotation(touch.clientX, touch.clientY);
    }
}, {passive: true});

// Start button event
startBtn.addEventListener('click', () => {
    const inputText = inputTextEl.value.trim();
    const imageLinks = imageLinksEl.value.trim();
    const selectedMusic = musicSelector.value;
    
    if (inputText === '') {
        alert('Vui lòng nhập ít nhất một câu!');
        inputTextEl.focus();
        return;
    }
    
    if (imageLinks === '') {
        alert('Vui lòng nhập ít nhất một link ảnh!');
        imageLinksEl.focus();
        return;
    }
    
    textLines = inputText.length ? inputText.split('\n').filter(line => line.trim() !== '') : [];
    images = imageLinks.length ? imageLinks.split('\n').filter(link => link.trim() !== '') : [];
    
    initScene();
    
    // Update text labels
    for (let i = 0; i < planes.length; i++) {
        let text = '';
        if (textLines.length > 0) {
            text = textLines[i % textLines.length];
        }
        updateLabelText(i, text);
    }
    
    // Start music if not already playing
    if (!audio && musicSelector.value) {
        playMusic(musicSelector.value);
    }
    
    // Create and update share link
    const data = {
        textLines: textLines,
        imageLinks: images,
        music: selectedMusic
    };
    
    const jsonString = JSON.stringify(data);
    const encodedData = encodeData(jsonString);
    const url = new URL(location.origin + '/loinhan.html');
    url.hash = 'id=' + encodedData;
    
    shareLinkEl.style.display = 'none';
    document.getElementById('loading-screen').style.display = 'block';
    
    setTimeout(() => {
        shareLinkEl.href = url.toString();
        shareLinkEl.textContent = url.toString();
        shareLinkEl.title = 'Click để mở link trong tab mới';
        shareLinkEl.style.display = 'inline-block';
        document.getElementById('loading-screen').style.display = 'none';
    }, 10000);
});

// Start animation
animate();

// Load from URL if available, otherwise show UI
if (loadFromURL()) {
    document.getElementById('ui').style.display = 'none';
} else {
    shareLinkEl.style.display = 'none';
}

// Window resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// QR button functionality and other features...
// [The rest of the code continues with QR generation, image upload, captcha, etc.]

// Heart and QR code drawing functions
const width = canvas.width;
const height = canvas.height;
const heartPathStr = 'M23.6,0c-3.4,0-6.3,2.7-7.6,5.2C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4 c0,9.4,16,21.2,16,21.2s16-11.8,16-21.2C32,3.8,28.2,0,23.6,0z';
const scale = 8;
const heartWidth = 32;
const heartHeight = 29.6;
const heartCenterX = 16;
const heartCenterY = 14;
const centerX = width / 2;
const centerY = height / 2;
const qrSize = 100;

async function drawHeartAndQRCode(url) {
    ctx.clearRect(0, 0, width, height);
    
    // Load and draw heart background
    const heartImg = new Image();
    heartImg.src = 'http://dkupload.site/uploads/files-1756619473480-231940394.png';
    await new Promise((resolve, reject) => {
        heartImg.onload = resolve;
        heartImg.onerror = reject;
    });
    
    const heartX = centerX - 128;
    const heartY = centerY - 118;
    ctx.drawImage(heartImg, heartX, heartY, 256, 236);
    
    // Generate and draw QR code
    try {
        const qrCanvas = document.createElement('canvas');
        qrCanvas.width = qrSize;
        qrCanvas.height = qrSize;
        
        await QRCode.toCanvas(qrCanvas, url, {
            width: qrSize,
            margin: 1,
            color: {
                dark: '#ff7094',
                light: '#ffffff'
            }
        });
        
        const qrX = centerX - qrSize / 2;
        const qrY = centerY - qrSize / 2;
        ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);
    } catch (error) {
        console.error('Lỗi tạo QR code:', error);
    }
}

// Download button
const downloadBtn = document.getElementById('downloadBtn');
downloadBtn.addEventListener('click', function() {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'anh_qr_traitim.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Image upload functionality
const uploadInput = document.getElementById('upload-imgbb');
const textarea = document.getElementById('imageLinks');
const encody = 'YTI0NTMxMjYyYmYxN2Y2M2EzZmFkNmJlZDNlM2Y4MDg=';
const APY = atob(encody);

uploadInput.addEventListener('change', async (event) => {
    const files = event.target.files;
    if (files.length) {
        for (const file of files) {
            const formData = new FormData();
            formData.append('image', file);
            
            try {
                const response = await fetch('https://api.imgbb.com/1/upload?key=' + APY, {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                if (result.success) {
                    const imageUrl = result.data.url;
                    textarea.value += imageUrl + '\n';
                } else {
                    alert('Upload ảnh thất bại: ' + result.error.message);
                }
            } catch (error) {
                alert('Lỗi khi upload ảnh: ' + error.message);
            }
        }
        uploadInput.value = '';
    }
});

// CAPTCHA system
(() => {
    const captchaPopup = document.getElementById('captcha-popup');
    const captchaCode = document.getElementById('captcha-code');
    const captchaInput = document.getElementById('captcha-input');
    const captchaError = document.getElementById('captcha-error');
    const captchaSubmit = document.getElementById('captcha-submit');
    const refreshCaptcha = document.getElementById('refresh-captcha');
    const uploadButton = document.getElementById('upload-imgbb');
    const uploadLabel = document.querySelector('label[for="upload-imgbb"]');
    
    captchaPopup.addEventListener('click', (event) => {
        if (event.target === captchaPopup) {
            captchaPopup.style.display = 'none';
        }
    });
    
    let currentCaptcha = '';
    
    function generateCaptcha() {
        currentCaptcha = (function(length = 5) {
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(55 * Math.random()));
            }
            return result;
        })();
        
        captchaCode.textContent = currentCaptcha;
        captchaInput.value = '';
        captchaError.textContent = '';
    }
    
    uploadLabel.addEventListener('click', (event) => {
        event.preventDefault();
        generateCaptcha();
        captchaPopup.style.display = 'flex';
        captchaInput.focus();
    });
    
    refreshCaptcha.addEventListener('click', () => {
        generateCaptcha();
        captchaInput.focus();
    });
    
    captchaSubmit.addEventListener('click', () => {
        const userInput = captchaInput.value.trim();
        
        if (userInput !== '') {
            if (userInput === currentCaptcha) {
                captchaError.textContent = '';
                captchaPopup.style.display = 'none';
                uploadButton.click();
            } else {
                captchaError.textContent = 'Mã CAPTCHA không đúng, vui lòng thử lại.';
                captchaInput.focus();
            }
        } else {
            captchaError.textContent = 'Vui lòng nhập CAPTCHA';
        }
    });
    
    captchaInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            captchaSubmit.click();
        }
    });
    
    uploadButton.addEventListener('change', () => {
        captchaPopup.style.display = 'none';
    });
})();

// Error handling image
const img = new Image();
img.src = 'https://github.com/Panbap/anh/blob/main/error/htbt1.png?raw=true';
img.style.display = 'none';

img.onload = () => {
    img.style.display = 'block';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
};

img.onerror = () => {
    console.warn('Ảnh lỗi, hiển thị thông báo bảo trì...');
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        (function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(20, 20, 20, 0.97)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 48px Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            const text = 'Hệ thống đang cập nhật';
            const maxWidth = 0.8 * canvas.width;
            const lineHeight = 60;
            const y = canvas.height / 2 - lineHeight / 2;
            
            function wrapText(context, text, x, y, maxWidth, lineHeight) {
                const words = text.split(' ');
                let line = '';
                const lines = [];
                
                for (let n = 0; n < words.length; n++) {
                    const testLine = line + words[n] + ' ';
                    if (context.measureText(testLine).width > maxWidth && n > 0) {
                        lines.push(line.trim());
                        line = words[n] + ' ';
                    } else {
                        line = testLine;
                    }
                }
                lines.push(line.trim());
                
                lines.forEach((line, index) => {
                    context.fillText(line, x, y + index * lineHeight);
                });
            }
            
            wrapText(ctx, text, canvas.width / 2, y, maxWidth, lineHeight);
        })();
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    Object.assign(canvas.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'auto'
    });
    
    document.body.appendChild(canvas);
};
