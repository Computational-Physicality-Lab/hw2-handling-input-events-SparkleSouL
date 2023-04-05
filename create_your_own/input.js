const targets = document.querySelectorAll(".target");
const workspace = document.querySelector('#workspace');

const MIN_WIDTH = 50;
const MIN_HEIGHT = 50;

var selectedDiv = null;
var isMouseDown = false;
var isDragging = false;
var isDoubleClicking = false;
var isResizing = false;

var direction

var movetarget = null;

var startX;
var startY;
var offsetX;
var offsetY;
var originalX;
var originalY;

// 監聽滑鼠點擊 div 事件
document.addEventListener('click', function (event) {
    if(!isDragging && !isDoubleClicking){
        if (event.target.classList.contains('target')) {
            // 取消選取其他已被選取的 div
            if(selectedDiv !== null && selectedDiv !== event.target){
                selectedDiv.style.backgroundColor = 'red';
                selectedDiv = null;
            }

            // 將點擊的 div 顏色改為藍色
            event.target.style.backgroundColor = '#00f';

            // 將點擊的 div 標記為已選取
            selectedDiv = event.target;
        } else {
        // 取消選取任何 div
        if(selectedDiv !== null){
            selectedDiv.style.backgroundColor = 'red';
            selectedDiv = null;
            }
        }
    }
    else{
        isDragging = false;
    }
});

// 監聽長按 div 並移動事件
for (var i = 0; i < targets.length; i++) {
    targets[i].addEventListener('mousedown', function (event) {
        event.preventDefault();
        isMouseDown = true;
        startX = event.target.offsetLeft;
        startY = event.target.offsetTop;
        offsetX = event.clientX - startX;
        offsetY = event.clientY - startY;
        movetarget = event.target;
    });
  }
  
// 監聽滑鼠移動事件
document.addEventListener('mousemove', function (event) {
    if (isMouseDown && movetarget) {
        isDragging = true;
        movetarget.style.left = event.clientX - offsetX + "px";
        movetarget.style.top = event.clientY - offsetY + "px";
    }
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && isDragging) {
            // 將 div 回到原始位置
            movetarget.style.left = startX + 'px';
            movetarget.style.top = startY + 'px';
        }
    });
});

// 監聽滑鼠放開事件
document.addEventListener('mouseup', function (event) {
    isMouseDown = false;
    movetarget = null;
});

// 監聽滑鼠雙擊 div 事件
document.addEventListener('dblclick', function (event) {
    if (event.target.classList.contains('target')) {
        isDoubleClicking = true;
        selectedDiv.style.backgroundColor = 'red';

        selectedDiv = event.target;
        // 將點擊的 div 顏色改為藍色
        selectedDiv.style.backgroundColor = '#00f';
    
    

        // 記錄原始位置
        originalX = selectedDiv.offsetLeft;
        originalY = selectedDiv.offsetTop;

        offsetX = event.clientX - originalX;
        offsetY = event.clientY - originalY;
    
        // 觸發跟隨模式
        document.addEventListener('mousemove', followMouse);

        // 取消其他跟點擊有關的事件
        document.addEventListener('mousedown', preventDefault);
        document.addEventListener('mouseup', preventDefault);
        document.addEventListener('click', preventDefault);
        document.addEventListener('contextmenu', preventDefault);
    
        function followMouse(event) {
            // 移動 div
            if(isDoubleClicking){
                selectedDiv.style.left = event.clientX - offsetX + 'px';
                selectedDiv.style.top = event.clientY - offsetY + 'px';
            }
        }
    
        // 監聽按下 ESC 鍵事件
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && isDoubleClicking) {
                // 將 div 回到原始位置
                selectedDiv.style.left = originalX + 'px';
                selectedDiv.style.top = originalY + 'px';

                isDoubleClicking = false;
        
                // 移除監聽事件
                document.removeEventListener('mousemove', followMouse);
                document.removeEventListener('mousedown', preventDefault);
                document.removeEventListener('mouseup', preventDefault);
                document.removeEventListener('click', preventDefault);
                document.removeEventListener('contextmenu', preventDefault);
                document.removeEventListener('keydown', arguments.callee);
            }
        });
      
        // 監聽滑鼠放開事件
        document.addEventListener('click', function (event) {
            // 移除監聽事件
            document.removeEventListener('mousemove', followMouse);
            document.removeEventListener('mousedown', preventDefault);
            document.removeEventListener('mouseup', preventDefault);
            document.removeEventListener('click', preventDefault);
            document.removeEventListener('contextmenu', preventDefault);
            
            isDoubleClicking = false;
        });
        
    }
});

// 監聽單指觸控 div 事件

document.addEventListener('touchstart', function (event) {
    if (event.touches.length === 1) {
        if(!isDragging && !isDoubleClicking){
            if (event.target.classList.contains('target')) {
                // 進入「跟隨手指模式」
                isDragging = true;
                movetarget = event.target;
                startX = parseInt(movetarget.style.left) || 0;
                startY = parseInt(movetarget.style.top) || 0;
                offsetX = event.touches[0].clientX - startX;
                offsetY = event.touches[0].clientY - startY;
            }
        }
    }
});

// 監聽單指移動事件
document.addEventListener('touchmove', function (event) {
    if (isDragging && movetarget && event.touches.length === 1) {
        movetarget.style.left = event.touches[0].clientX - offsetX + "px";
        movetarget.style.top = event.touches[0].clientY - offsetY + "px";
    }
});

// 監聽單指放開事件
document.addEventListener('touchend', function (event) {
    if (isDragging && movetarget) {
        isDragging = false;
        movetarget = null;
    }

    if (isResizing) {
        isResizing = false;
    }
});
  
// 監聽雙指觸控 div 事件
document.addEventListener('touchstart', function (event) {
    if (event.touches.length === 2) {
        // 中止「跟隨手指模式」
        if(isDragging && movetarget){
            movetarget.style.left = startX + 'px';
            movetarget.style.top = startY + 'px';
            isDragging = false;
            movetarget = null;
        }
    }
});
/*
// 監聽雙指移動事件
document.addEventListener('touchmove', function (event) {
    if(event.touches.length === 2){
        // 中止「跟隨手指模式」
        if(isFollowingFinger && movetarget){
            movetarget.style.left = startX + 'px';
            movetarget.style.top = startY + 'px';
            isFollowingFinger = false;
            movetarget = null;
        }
    }
});*/

document.addEventListener('touchstart', function (event) {
    if (event.touches.length === 2) {
        event.preventDefault();
        isResizing = true;
        
        originalX = selectedDiv.offsetLeft;
        originalY = selectedDiv.offsetTop;

        // 取得兩根手指座標位置
        var touch1 = event.touches[0];
        var touch2 = event.touches[1];
        // 計算兩根手指之間的距離
        initialDistance = getDistance(touch1.clientX, touch1.clientY, touch2.clientX, touch2.clientY);
        direction = XorY(touch1.clientX, touch1.clientY, touch2.clientX, touch2.clientY)
        // 計算 div 目前的寬度、高度
        initialWidth = parseInt(getComputedStyle(selectedDiv).getPropertyValue('width'), 10);
        initialHeight = parseInt(getComputedStyle(selectedDiv).getPropertyValue('height'), 10);
    }
});

document.addEventListener('touchmove', function (event) {
    if (isResizing && event.touches.length === 2) {
        // 取得兩根手指座標位置
        var touch1 = event.touches[0];
        var touch2 = event.touches[1];
        // 計算兩根手指之間的距離
        var currentDistance = getDistance(touch1.clientX, touch1.clientY, touch2.clientX, touch2.clientY);
        // 計算寬度、高度的比例
        var scale = currentDistance - initialDistance;
        // 計算新的寬度、高度
        if(direction === 'x'){
            var newWidth = initialWidth + scale;
            //var newHeight = initialHeight * scale;
            // 檢查是否超出最小長寬限制
            if (newWidth >= MIN_WIDTH /*&& newHeight >= MIN_HEIGHT*/) {
                selectedDiv.style.left = originalX - ( scale / 2 ) + 'px';
                selectedDiv.style.width = newWidth + 'px';
                //selectedDiv.style.height = newHeight + 'px';
            }
        }else if(direction === 'y'){
            var newHeight = initialHeight + scale;
            // 檢查是否超出最小長寬限制
            if (newHeight >= MIN_HEIGHT) {
                selectedDiv.style.top = originalY - ( scale / 2 ) + 'px';
                selectedDiv.style.height = newHeight + 'px';
                //selectedDiv.style.height = newHeight + 'px';
            }
        }
    }
});

function XorY(x1, y1, x2, y2) {
    Math.abs(x1 - x2) > Math.abs(y1 - y2) ? 'x' : 'y'; 
}

function getDistance(x1, y1, x2, y2) {
    var deltaX = x1 - x2;
    var deltaY = y1 - y2;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function preventDefault(event) {
    event.preventDefault();
}