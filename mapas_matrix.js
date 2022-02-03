///////////Creación variable mapa/////////// 
var map = L.map('map', {
		zoomControl: false,
		center: [40, -3],
		zoom: 6,
		minZoom: 3,
		maxZoom: 20,
		maxBounds: [
			[20, -50],
			[50, 50]
			],
	});

///////////Funcionalidades estructura del visor///////////
//Layers on top
map.createPane('límites');
// This pane is above markers but below popups
map.getPane('límites').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('límites').style.pointerEvents = 'none';
//Labels on top
map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 800;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
//bindTooltip on top
map.createPane('popups');
// el popup aparece al arrastar encima de todo pero debajo del popup que aparece al clicar
map.getPane('popups').style.zIndex = 1000;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups').style.pointerEvents = 'none';
//bindPopup on top
map.createPane('popups1');
// aparece por encima de todas las capas
map.getPane('popups1').style.zIndex = 1500;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups1').style.pointerEvents = 'none';
//Barra de interacción de capas	tantaas sildebar como grupos de capas
var sidebar = L.control.sidebar('sidebar', { closeButton:true, position: 'left' });
	map.addControl(sidebar);
	sidebar.hide();			
	sidebar.show();
	sidebar.toggle();
var visible = sidebar.isVisible();
var button = new L.Control.Button(L.DomUtil.get('helpbutton'), { toggleButton: 'active', position: 'topleft'});
	button.addTo(map);
	button.on('click', function () {
	 if (button.isToggled()) {
			sidebar.hide();
		} else {
			sidebar.show();
		}
	});
var sidebar2 = L.control.sidebar('sidebar2', { closeButton:true, position: 'right' });
	map.addControl(sidebar2);
	sidebar2.hide();			
	sidebar2.show();
	sidebar2.toggle();
var visible2 = sidebar.isVisible();

//Buscador
var geocoder = L.Control.geocoder({ position: 'topleft',
	//defaultMarkGeocode: false
	}).addTo(map);


///////////Diseño caracteriticas basicas del visor///////////
//Título
var title2 = L.control({position: 'topright'});
	title2.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info2');
	 div.innerHTML +=
	 'VISOR CARTOGRÁFICO<h3>Contaminación atmosférica difusa<br>Proyecto IMPACTSIG </h3>';
	 return div;
	};
	title2.addTo(map);
//Logo Matrix	
var title1 = L.control({position: 'bottomright'});
	title1.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info1');
	 div.innerHTML +=
	 '<a href="https://www.fundacionmatrix.es"><img src="images/matrix.png" width="75%" ></img></a>';
	 return div;
	};
	title1.addTo(map);
//Logo impactsig	
var title3 = L.control({position: 'bottomright'});
	title3.onAdd = function (map) {
var div = L.DomUtil.create('div','info3');
	 div.innerHTML +=
	 '<a><img src="images/impactsig.png" width="100px" height="63px" ></img></a>';
	 return div;
	};
	title3.addTo(map);  


///////////Cartografía de referencia///////////
var Mapa_fondo = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2019 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	}).addTo(map);		
//			var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB'
//			}).addTo(map);
//			var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB',
//			pane: 'labels'
//			}).addTo(map);
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy'
	});
var osm1 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	opacity: 0,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
var osm2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	minZoom: 0, 
	maxZoom: 13,
	});
var osm3 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2019 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	});
//Límites
var comunidades = L.geoJson(comunidades, {
	color: "#17202A", 
	weight: 1.3,
	opacity: 0.5,
	fillOpacity: 0,
	pane: 'límites', // layer goes on top.
	attribution: '| © <a href="http://www.ign.es">Instituto Geográfico Nacional |'			
	}).addTo(map);
var provincias = L.geoJson(provincias, {
	color: "#424242", 
	weight: 1,
	opacity: 1,
	fillOpacity: 0,
	pane: 'límites',
	attribution: '| © <a href="http://www.ign.es">Instituto Geográfico Nacional |'
	}).addTo(map);	

///////////Otras funcionalidades
//minimapa	
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, position:"bottomright", width:100,height:100,}).addTo(map); 					
//zoomHome
var zoomHome = L.Control.zoomHome({ position: 'topleft', homeCoordinates:[40, -5], zoomHomeTitle:'Posición inicial'}).addTo(map);
//fullscreen						
var fsControl = new L.Control.FullScreen();
	map.addControl(fsControl);
	map.on('enterFullscreen', function(){
	if(window.console) window.console.log('enterFullscreen');
	});
	map.on('exitFullscreen', function(){
	if(window.console) window.console.log('exitFullscreen');
	});
	L.control.scale().addTo(map);

///////////Estilo de las capas especificas del visor///////////

//clases municipio

function getColor100(a) {
	return a == 'Muy bajas' ? '#2892C6' :
	a == 'Bajas' ? '#81B3AB' :
	a == 'Bajas (salvo NH3)' ? '#BFD48A' :
	a == 'Medias' ? '#FAFAA3' :
	a == 'Altas' ? '#FFD900' :
	a == 'Altas(muy altas SO2)'? '#E67700' :
	a == 'Muy altas' ? '#BF1D00' :
	'#C2523C';
};
function style100(feature) {
	return {
		fillColor: getColor100(feature.properties.multivar),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 1
	};
};
function popup100(feature, layer) {
	if (feature.properties && feature.properties.CO) {
		layer.bindTooltip("<strong>Clases: </strong>"+feature.properties.multivar.toLocaleString()+"<BR><strong>Municipio: </strong> "+feature.properties.NAMEUNIT.toLocaleString(),{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};
};
var geojson100 = L.geoJson(tabla_cont, {
	style: style100,
	onEachFeature: popup100
});

//so2

function getColor1(a) {
	return a > 10 ? '#BE1D00' :
	a > 9 ? '#E67701' :
	a > 5 ? '#FFD900' :
	a > 2.5? '#BAD578' :
	a > 0.5 ? '#619900' :
	a > 0 ? '#016E01' :
	a == 0 ? '#004800' :

	'#C2523C';
};
function style1(feature) {
	return {
		fillColor: getColor1(feature.properties.SO2),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 1
	};

};
function popup1(feature, layer) {
	if (feature.properties && feature.properties.CO) {
		layer.bindTooltip("<strong>Emisiones de SO<SUB>2</SUB>: </strong>"+(feature.properties.SO2? feature.properties.SO2.toString().replace(".", ","):feature.properties.SO2)+" t/km<sup>2</sup><BR><strong>Municipio: </strong>"+feature.properties.NAMEUNIT.toLocaleString(),{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};
};
var geojson1 = L.geoJson(tabla_cont, {
	style: style1,
	onEachFeature: popup1
});

//NO2
function getColor2(a) {
	return a > 40 ? '#BE1D00' :
	a > 20 ? '#E67701' :
	a > 10 ? '#FFD900' :
	a > 5? '#BAD578' :
	a > 1 ? '#619900' :
	a > 0 ? '#016E01' :
	a == 0 ? '#004800' :

	'#C2523C';
};
function style2(feature) {
	return {
		fillColor: getColor2(feature.properties.NOx),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 1
	};
};
function popup2(feature, layer) {
	if (feature.properties && feature.properties.CO) {
		layer.bindTooltip("<strong>Emisiones de NO<SUB>2</SUB>: </strong>"+(feature.properties.NOx? feature.properties.NOx.toString().replace(".", ","):feature.properties.NOx)+" t/km<sup>2</sup><BR><strong>Municipio: </strong>"+feature.properties.NAMEUNIT.toLocaleString(),{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};
};
var geojson2 = L.geoJson(tabla_cont, {
	style: style2,
	onEachFeature: popup2
});

//NH3
function getColor3(a) {return a > 2.5 ? '#BE1D00' :
	a > 2 ? '#E67701' :
	a > 1.5 ? '#FFD900' :
	a > 1? '#BAD578' :
	a > 0.5 ? '#619900' :
	a > 0 ? '#016E01' :
	a == 0 ? '#004800' :
	'#C2523C';
};
function style3(feature) {
	return {
		fillColor: getColor3(feature.properties.NH3),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 1
	};
};
function popup3(feature, layer) {
	if (feature.properties && feature.properties.CO) {
		layer.bindTooltip("<strong>Emisiones de NH<SUB>3</SUB>: </strong>"+(feature.properties.NH3? feature.properties.NH3.toString().replace(".", ","):feature.properties.NH3)+" t/km<sup>2</sup><BR><strong>Municipio: </strong>"+feature.properties.NAMEUNIT.toLocaleString(),{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};
};
var geojson3 = L.geoJson(tabla_cont, {
	style: style3,
	onEachFeature: popup3
});

//CO

function getColor4(a) {
	return a > 120 ? '#BE1D00' :
	a > 60 ? '#E67701' :
	a > 30 ? '#FFD900' :
	a > 15? '#BAD578' :
	a > 3 ? '#619900' :
	a > 0 ? '#016E01' :
	a == 0 ? '#004800' :
	'#C2523C';
};
function style4(feature) {
	return {
		fillColor: getColor4(feature.properties.CO),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 1
	};
};
function popup4(feature, layer) {
	if (feature.properties && feature.properties.CO) {
		layer.bindTooltip("<strong>Emisiones de CO </strong>"+(feature.properties.CO? feature.properties.CO.toString().replace(".", ","):feature.properties.CO)+" t/km<sup>2</sup><BR><strong>Municipio: </strong>"+feature.properties.NAMEUNIT.toLocaleString(),{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};
};
var geojson4 = L.geoJson(tabla_cont, {
	style: style4,
	onEachFeature: popup4
});

//deposito total de nitrogeno
function getColor5(a) 
    {return a == 'Minima' ? '#2892C6' :
	a == 'Baja' ? '#9FC29A' :
	a == 'Moderada' ? '#FAFA64' :
	a == 'Severa' ? '#FA8C33' :
	a == 'Extrema' ? '#E81015' :

	'#C2523C';
};
function style5(feature) {
	return {
		fillColor: getColor5(feature.properties.Vulner_cla),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 1
	};
};
function popup5(feature, layer) {
	if (feature.properties && feature.properties.CO) {
		layer.bindTooltip("<strong>Vulnerabilidad: </strong>"+(feature.properties.Vulner_cla? feature.properties.Vulner_cla.toString().replace(".", ","):feature.properties.Vulner_cla)+"<BR><strong>Municipio: </strong>"+feature.properties.NAMEUNIT.toLocaleString(),{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};
};
var geojson5 = L.geoJson(tabla_cont, {
	style: style5,
	onEachFeature: popup5
});


//PM10
function getColor6(a) {
	return a > 6 ? '#BE1D00' :
	a > 3 ? '#E67701' :
	a > 1.5 ? '#FFD900' :
	a > 0.5? '#BAD578' :
	a > 0.15 ? '#619900' :
	a > 0 ? '#016E01' :
	a == 0 ? '#004800' :
	'#C2523C';

};

function style6(feature) {
	return {
		fillColor: getColor6(feature.properties.PM10),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 1
	};
};
function popup6(feature, layer) {
	if (feature.properties && feature.properties.CO) {
		layer.bindTooltip("<strong>Emisiones de partículas gruesas (PM<sub>10</sub>): </strong>"+(feature.properties.PM10? feature.properties.PM10.toString().replace(".", ","):feature.properties.PM10)+" t/km<sup>2</sup><BR><strong>Municipio: </strong>"+feature.properties.NAMEUNIT.toLocaleString(),{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};
};
var geojson6 = L.geoJson(tabla_cont, {
	style: style6,
	onEachFeature: popup6
});


var mapa100 = L.layerGroup([geojson100]).addTo(map);
var mapa1 = L.layerGroup([geojson1]);
var mapa2 = L.layerGroup([geojson2]);
var mapa3 = L.layerGroup([geojson3]);
var mapa4 = L.layerGroup([geojson4]);
var mapa5 = L.layerGroup([geojson5]);
var mapa6 = L.layerGroup([geojson6]);

var baseTree = [
	{ label: "<strong>Limpiar mapa", layer: osm3 },
	{
	label: '<strong>Mapas de emisiones de contaminantes atmosféricos por municipios',
	children: [

	    { label: "Clases de municipios según emisiones contaminantes", layer: mapa100 },
	    { label: "Emisiones de partículas gruesas (PM<sub>10</sub>)", layer: mapa6 },		
	    { label: "Emisiones de NO<SUB>2</SUB>", layer: mapa2 },
		{ label: "Emisiones de CO", layer: mapa4 },
		{ label: "Emisiones de NH<SUB>3</SUB>", layer: mapa3 },
		{ label: "Emisiones de SO<SUB>2</SUB>", layer: mapa1 },
		{ label: "Vulnerabilidad de municipios por emisiones de contaminantes", layer: mapa5 },
	
	]
	},
	];
	
var overlayTree = {
	label: 'Mapas de referencia',
	children: [
		{ label: "<b>Límites de Comunidades Autónomas", layer: comunidades},
		{ label: "<b>Límites de Provincias", layer: provincias},		
		{ label: "OpenStreetMap", layer: osm},
		
	]
};	

///////////Definicion del estilo de la leyenda de cada capa///////////
// leyenda mapa100	

var htmlLegend100 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Clases multivarientes de municipios segun sus emisiones contaminantes de fuentes difusas'+"<\h3>",
			style: style100,
			layer: mapa100,
			elements: [{
				label:"<h4>"+  'Clases de emisiones'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  'Muy bajas'+"<\h4>",html: '',style: {'background-color': '#2892C6','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Bajas'+"</h4>",html: '',style: {'background-color': '#81B3AB','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Bajas (salvo NH<sub>3</sub>)'+"<\h4>",html: '',style: {'background-color': '#BFD48A','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Medias'+"<\h4>",html: '',style: {'background-color': '#FAFAA3','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Altas'+"<\h4>",html: '',style: {'background-color': '#FFD900','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  'Altas (Muy altas en SO<sub>2</sub>)'+"<\h4>",html: '',style: {'background-color': '#E67700','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
			    label:"<h4>"+  'Muy altas'+"<\h4>",html: '',style: {'background-color': '#BF1D00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {	
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  ''+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: Elaboración desde datos de 2008 y mapas del IGN (AEMA, 2011; IGN, 2017)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend100);


//leyenda mapa6
var htmlLegend6 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Emisión anual de partículas gruesas (PM<sub>10</sub>) del total de fuentes difusas'+"<\h3>",
			style: style6,
			layer: mapa6,
			elements: [{
				label:"<h4>"+  'Unidades: t/km<sup>2</sup>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
                label:"<h4>"+  '0'+"<\h4>",html: '',style: {'background-color': '#004800','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,1 - 0,15'+"<\h4>",html: '',style: {'background-color': '#016E01','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {	
				label:"<h4>"+  '0,16 - 0,5'+"<\h4>",html: '',style: {'background-color': '#619900','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,51 - 1,5'+"<\h4>",html: '',style: {'background-color': '#BAD475','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,6 - 3'+"<\h4>",html: '',style: {'background-color': '#FFD900','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '3,1 - 6'+"<\h4>",html: '',style: {'background-color': '#E67701','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '6,1 - 9'+"<\h4>",html: '',style: {'background-color': '#BE1D00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: Elaboración desde datos de 2008 y mapas del IGN (AEMA, 2011; IGN, 2017)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend6);




// leyenda mapa5	
var htmlLegend5 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Clases de municipios por la vulnerabilidad de la población total según las clases multivariantes de  emisiones de fuentes difusas de contaminación'+"<\h3>",
			style: style5,
			layer: mapa5,
			elements: [{
				label:"<h4>"+  'Clases de vulnerabilidad'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  'Extrema'+"<\h4>",html: '',style: {'background-color': '#E81015','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Severa'+"<\h4>",html: '',style: {'background-color': '#FA8C33','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Moderada'+"<\h4>",html: '',style: {'background-color': '#FAFA64','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Baja'+"<\h4>",html: '',style: {'background-color': '#9FC29A','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  'Mínima'+"<\h4>",html: '',style: {'background-color': '#2892C6','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: Elaboración desde datos de 2008 y mapas del IGN (AEMA, 2011; IGN, 2017)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend5);
// leyenda mapa4	
var htmlLegend4 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Emisión anual de monóxido de carbono (CO) del total de fuentes difusas por municipio'+"<\h3>",
			style: style4,
			layer: mapa4,
			elements: [{
				label:"<h4>"+  'Unidades: t/km<sup>2</sup'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  '120 - 150'+"<\h4>",html: '',style: {'background-color': '#BE1D00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '60,01 - 120'+"<\h4>",html: '',style: {'background-color': '#E67701','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '30,01 - 60'+"<\h4>",html: '',style: {'background-color': '#FFD900','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '15,01 - 30'+"<\h4>",html: '',style: {'background-color': '#BAD578','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '3,01 - 15'+"<\h4>",html: '',style: {'background-color': '#619900','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,01 - 3 '+"<\h4>",html: '',style: {'background-color': '#016E01','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '0'+"<\h4>",html: '',style: {'background-color': '#004800','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: Elaboración desde datos de 2008 y mapas del IGN (AEMA, 2011; IGN, 2017)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend4);
// leyenda mapa3	
var htmlLegend3 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Emisión anual de óxidos de amoniaco (NH<sub>3</sub>) del total de fuentes difusas por municipio'+"<\h3>",
			style: style3,
			layer: mapa3,
			elements: [{
				label:"<h4>"+  'Unidades: t/km<sup>2</sup>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  '2,51 - 3,5'+"<\h4>",html: '',style: {'background-color': '#BE1D00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '2,01 - 2.5'+"<\h4>",html: '',style: {'background-color': '#E67701','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,51 - 2'+"<\h4>",html: '',style: {'background-color': '#FFD900','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,01 - 1.5'+"<\h4>",html: '',style: {'background-color': '#BAD578','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,51 - 1'+"<\h4>",html: '',style: {'background-color': '#619900','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,01 - 0,5 '+"<\h4>",html: '',style: {'background-color': '#016E01','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '0'+"<\h4>",html: '',style: {'background-color': '#004800','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: Elaboración desde datos de 2008 y mapas del IGN (AEMA, 2011; IGN, 2017)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend3);
// leyenda mapa2	
var htmlLegend2 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Emisión anual de óxidos de nitrogeno (NO<sub>2</sub>) del total de fuentes difusas por municipio'+"<\h3>",
			style: style2,
			layer: mapa2,
			elements: [{
				label:"<h4>"+  'Unidades: t/km<sup>2</sup>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  '40,1 - 45'+"<\h4>",html: '',style: {'background-color': '#BE1D00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '20,1 - 40'+"<\h4>",html: '',style: {'background-color': '#E67701','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '10,1 - 20'+"<\h4>",html: '',style: {'background-color': '#FFD900','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '5,1 - 10'+"<\h4>",html: '',style: {'background-color': '#BAD578','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,1 - 5'+"<\h4>",html: '',style: {'background-color': '#619900','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,1 - 1'+"<\h4>",html: '',style: {'background-color': '#016E01','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '0'+"<\h4>",html: '',style: {'background-color': '#004800','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: Elaboración desde datos de 2008 y mapas del IGN (AEMA, 2011; IGN, 2017)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend2);
// leyenda mapa1	
var htmlLegend1 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Emisión anual de dióxido de azufre (SO<sub>2</sub>) del total de fuentes difusas por municipio '+"<\h3>",
			style: style1,
			layer: mapa1,
			elements: [{
				label:"<h4>"+  'Unidades: t/km<sup>2</sup>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  '0'+"<\h4>",html: '',style: {'background-color': '#004800','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,01 - 0,50'+"<\h4>",html: '',style: {'background-color': '#016E01','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,51 - 2,5'+"<\h4>",html: '',style: {'background-color': '#619900','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '2,51 - 5'+"<\h4>",html: '',style: {'background-color': '#BAD578','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '5,1 - 9'+"<\h4>",html: '',style: {'background-color': '#FFD900','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '9,1 - 10'+"<\h4>",html: '',style: {'background-color': '#E67701','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
			
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: Elaboración desde datos de 2008 y mapas del IGN (AEMA, 2011; IGN, 2017)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend1);

//Visualizar capas
// L.control.layers(baseLayers, overlays,{collapsed:true, position: 'topright',}).addTo(map);
L.control.layers.tree(baseTree, overlayTree).addTo(map);

//boton de informacion 
var button2 = new L.Control.Button(L.DomUtil.get('helpbutton2'), { toggleButton: 'active', position: 'topright'});
	button2.addTo(map);
	button2.on('click', function () {
	 if (button2.isToggled()) {
			sidebar2.hide();
		} else {
			sidebar2.show();
		}
	});