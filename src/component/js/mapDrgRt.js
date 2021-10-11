// --------------------------------------
// -------CONFIGURATION---------------
// --------------------------------------

// CANVAS SIZE

const CANVAS_SIZE = 500;

// INFORME AQUI OS ICONES QUE APARECERÃO NO CANVAS

const locations = new Map()
locations.set('RS', { x: 260, y: 445 });
locations.set('SP', { x: 316, y: 353 });
locations.set('MT', { x: 231, y: 237 });
locations.set('SC', { x: 300, y: 417 });
locations.set('PR', { x: 280, y: 382 });
locations.set('MS', { x: 243, y: 332 });
locations.set('RJ', { x: 401, y: 368 });
locations.set('MG', { x: 366, y: 315 });
locations.set('ES', { x: 430, y: 330 });
locations.set('DF', { x: 352, y: 276 });
locations.set('GO', { x: 302, y: 282 });
locations.set('BA', { x: 399, y: 231 });
locations.set('SE', { x: 471, y: 226 });
locations.set('AL', { x: 486, y: 208 });
locations.set('PE', { x: 452, y: 184 });
locations.set('PB', { x: 480, y: 168 });
locations.set('RN', { x: 473, y: 152 });
locations.set('CE', { x: 432, y: 142 });
locations.set('PI', { x: 389, y: 172 });
locations.set('TO', { x: 325, y: 201 });
locations.set('MA', { x: 363, y: 138 });
locations.set('PA', { x: 266, y: 140 });
locations.set('AP', { x: 280, y: 58 });
locations.set('RO', { x: 140, y: 212 });
locations.set('AM', { x: 121, y: 123 });
locations.set('RR', { x: 161, y: 49 });
locations.set('AC', { x: 45, y: 190 });

/// IMAGE PATH

const bgImage = 'src/assets/images/mapa_site.png'

class MapDragRoute {
    static create(_callback) {

        // ELEMENT
        if (!$('.map-drg-rt')[0]) return;

        $('.map-drg-rt').empty();
        $('.map-drg-rt').append(`
            <div class="btn-group d-flex">
                <button class="btn btn-secondary w-100"> MAPA </button>
                <button class="btn btn-secondary w-10" id="minimizeMapDrgRt"><i class="fa fa-chevron-down" aria-hidden="true"></i></button>
            </div>
            `);
        $('.map-drg-rt').append(`
            <div id="mainMapDrgRt">
                <div class="pt-2 map-canv text-center">
                    <canvas id="canvas" width="${CANVAS_SIZE}" height="${CANVAS_SIZE}"></canvas>
                    <canvas id="canvasDef" width="505" height="500"></canvas>
                </div>
                <div class="px-4 mb-2 d-flex justify-content-between map-opt">                    
                    <div class="btn btn-light border rounded" id="clear">LIMPAR <i class="fa fa-repeat" aria-hidden="true"></i></div>                    
                    <div class="btn btn-success border rounded" id="confirmed">CONFIRMAR</div>
                </div> 
            </div> 
            `);
        $('.map-drg-rt').addClass('shadow')

        // STYLES
        canvas.style.position = 'absolute'

        // LISTENERS
        minimizeMapDrgRt.addEventListener('click', minimizeWindow, false);
        clear.addEventListener('click', clearMap, false);
        canvas.addEventListener('mousedown', startDragLine, false);
        canvas.addEventListener('mouseup', stopDragLine, false);
        clear.addEventListener('click', clearMap, false);
        confirmed.addEventListener('click', routeConfirmed, false);

        // VAR DECLARATION       
        var route = [];
        var initialPoint;
        var currentPoint;
        var cursorX;
        var cursorY;
        var canvasOver = document.getElementById("canvas"); //canvas, context, other vars etc
        var ctxOver = canvasOver.getContext("2d");
        var canvasUnder = document.getElementById("canvasDef"); //canvas, context, other vars etc
        var ctxUnder = canvasUnder.getContext("2d");
        var rect = canvas.getBoundingClientRect();
        var intervalLoop = null;
        var img = new Image;

        // FUNCTIONS
        function startDragLine() {
            let selectedLocation = isInsideLocation();
            if (!selectedLocation) return
            if (!initialPoint) {
                setInitPoint(selectedLocation)
                currentLocation(selectedLocation)
            }

            /* if (isCurrentPoint()) */
            intervalLoop = setInterval(function () {
                draggedLine()
            }, 1);
        }

        function stopDragLine() {
            let selectedLocation = isInsideLocation();
            if (!initialPoint && selectedLocation) setInitPoint(selectedLocation)
            if (selectedLocation && !selectedLocation.property?.selected) {
                selectedLocation.property.selected = true;
                drawLine(ctxUnder, currentPoint, selectedLocation.property, '#0194ad')
                drawArc(ctxUnder, selectedLocation.property, 'white', '#0194ad', selectedLocation.name, 'white')
                currentPoint = { ...selectedLocation.property };
                route.push(selectedLocation.name);
            }
            highlightSelected();
            ctxOver.clearRect(0, 0, canvasOver.width, canvasOver.height);
            clearInterval(intervalLoop);
        }

        function draggedLine() {
            ctxOver.clearRect(0, 0, canvasOver.width, canvasOver.height);
            ctxOver.beginPath();
            ctxOver.moveTo(currentPoint.x, currentPoint.y);
            ctxOver.lineTo(cursorX, cursorY, 6);
            ctxOver.arc(cursorX, cursorY, 5, 0, 2 * Math.PI);
            ctxOver.strokeStyle = '#000000';
            ctxOver.stroke();
        }

        function drawLine(ctx, begin, end, strokeColor) {
            ctx.beginPath();
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 3;
            ctx.moveTo(begin.x, begin.y);
            ctx.lineTo(end.x, end.y, 6);
            ctx.stroke();
        }

        function drawArc(ctx, pos, strokeColor, fillColor, text, textColor) {
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 15, 0, 2 * Math.PI);
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 5;
            ctx.stroke();
            ctx.fillStyle = fillColor ? fillColor : 'rgba(0, 0, 200, 0)';
            ctx.fill();
            if (!text) return
            ctx.font = "15px Arial";
            ctx.fillStyle = textColor;
            ctx.textAlign = "center";
            ctx.fillText(text, pos.x, pos.y + 5);
        }

        function setInitPoint(location) {
            initialPoint = { ...location.property }
            currentPoint = { ...location.property }
        }

        function currentLocation(location) {
            location.property.selected = true;
            drawArc(ctxUnder, location.property, 'white', '#0194ad', location.name, 'white')
            currentPoint = { ...location.property };
            route.push(location.name);
        }

        function isInsideLocation() {
            let selectedLocation;
            locations.forEach((e, key) => {
                if (cursorX < parseInt(e.x) + 15 && cursorX > parseInt(e.x) - 15
                    && cursorY < parseInt(e.y) + 15 && cursorY > parseInt(e.y) - 15) {
                    selectedLocation = { name: key, property: e }
                }
            })
            return selectedLocation;
        }

        function isCurrentPoint() {
            return (currentPoint.x < parseInt(cursorX) + 15 && currentPoint.x > parseInt(cursorX) - 15 &&
                currentPoint.y < parseInt(cursorY) + 15 && currentPoint.y > parseInt(cursorY) - 15)
        }

        function highlightSelected() {
            locations.forEach((e, key) => {
                if (e.selected) drawArc(ctxUnder, e, 'white', '#0194ad', key, 'white');
            })
        }

        function circleLocations() {
            locations.forEach((e, key) => {
                drawArc(ctxUnder, e, '#0194ad', 'white', key, 'black')
            })
        }

        function clearMap() {
            clearInterval(intervalLoop);
            initialPoint = null;
            currentPoint = null;
            locations.forEach((e) => {
                e.selected = false;
            })
            init()
        }

        function minimizeWindow() {
            $(mainMapDrgRt).toggle('minimizeMapDrgRt');
        }

        function routeConfirmed() {
            minimizeWindow()
            minimizeMapDrgRt.removeEventListener('click', minimizeWindow, false)
            $('.map-drg-rt').children().remove()
            return _callback(route);
        }

        function init() {
            ctxOver.clearRect(0, 0, canvasOver.width, canvasOver.height);
            ctxUnder.clearRect(0, 0, canvasOver.width, canvasOver.height);
            route = [];

            document.onmousemove = function (e) {
                cursorX = e.pageX - rect.left;
                cursorY = e.pageY - rect.top;

                if (cursorX > canvasOver.width || cursorY > canvasOver.height) clearInterval(intervalLoop)
            };    

            //CARREGA IMAGEM
            img.onload = function () {
                ctxUnder.drawImage(img, 0, 0, 500, 500);
                circleLocations();
            };
            img.src = bgImage;
            // ------------


        }

        clearMap();
    }
}