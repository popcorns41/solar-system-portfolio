import{C as ue,V as m,M as D,T as E,Q as Y,S as G,a as c,R as ce,P as de,b as fe,c as j,O as pe,B as N,F as V,d as b,U as A,W as x,H as S,N as F,e as me,f as w,A as q,g as ge,h as ve,D as Z,i as _e,j as xe,k as be,l as we,m as Se,n as Te,o as ye,p as Me,q as Ee,r as De,s as $,t as J,u as Ce,v as Pe,w as Be,x as ee,G as te,E as ie,L as se,y as ae,z as Le,I as Oe,J as Re}from"./index-9j9QVn2Q.js";const W={type:"change"},I={type:"start"},re={type:"end"},R=new ce,Q=new de,Ae=Math.cos(70*fe.DEG2RAD),g=new m,_=2*Math.PI,f={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},z=1e-6;class ke extends ue{constructor(e,t=null){super(e,t),this.state=f.NONE,this.target=new m,this.cursor=new m,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:D.ROTATE,MIDDLE:D.DOLLY,RIGHT:D.PAN},this.touches={ONE:E.ROTATE,TWO:E.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new m,this._lastQuaternion=new Y,this._lastTargetPosition=new m,this._quat=new Y().setFromUnitVectors(e.up,new m(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new G,this._sphericalDelta=new G,this._scale=1,this._panOffset=new m,this._rotateStart=new c,this._rotateEnd=new c,this._rotateDelta=new c,this._panStart=new c,this._panEnd=new c,this._panDelta=new c,this._dollyStart=new c,this._dollyEnd=new c,this._dollyDelta=new c,this._dollyDirection=new m,this._mouse=new c,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Ue.bind(this),this._onPointerDown=ze.bind(this),this._onPointerUp=Fe.bind(this),this._onContextMenu=Ve.bind(this),this._onMouseWheel=Ie.bind(this),this._onKeyDown=He.bind(this),this._onTouchStart=Ye.bind(this),this._onTouchMove=Ge.bind(this),this._onMouseDown=je.bind(this),this._onMouseMove=Ne.bind(this),this._interceptControlDown=Ze.bind(this),this._interceptControlUp=We.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(W),this.update(),this.state=f.NONE}update(e=null){const t=this.object.position;g.copy(t).sub(this.target),g.applyQuaternion(this._quat),this._spherical.setFromVector3(g),this.autoRotate&&this.state===f.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=_:i>Math.PI&&(i-=_),s<-Math.PI?s+=_:s>Math.PI&&(s-=_),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const n=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=n!=this._spherical.radius}if(g.setFromSpherical(this._spherical),g.applyQuaternion(this._quatInverse),t.copy(this.target).add(g),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let n=null;if(this.object.isPerspectiveCamera){const l=g.length();n=this._clampDistance(l*this._scale);const o=l-n;this.object.position.addScaledVector(this._dollyDirection,o),this.object.updateMatrixWorld(),a=!!o}else if(this.object.isOrthographicCamera){const l=new m(this._mouse.x,this._mouse.y,0);l.unproject(this.object);const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=o!==this.object.zoom;const h=new m(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(l),this.object.updateMatrixWorld(),n=g.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;n!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(n).add(this.object.position):(R.origin.copy(this.object.position),R.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(R.direction))<Ae?this.object.lookAt(this.target):(Q.setFromNormalAndCoplanarPoint(this.object.up,this.target),R.intersectPlane(Q,this.target))))}else if(this.object.isOrthographicCamera){const n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),n!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,a||this._lastPosition.distanceToSquared(this.object.position)>z||8*(1-this._lastQuaternion.dot(this.object.quaternion))>z||this._lastTargetPosition.distanceToSquared(this.target)>z?(this.dispatchEvent(W),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?_/60*this.autoRotateSpeed*e:_/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){g.setFromMatrixColumn(t,0),g.multiplyScalar(-e),this._panOffset.add(g)}_panUp(e,t){this.screenSpacePanning===!0?g.setFromMatrixColumn(t,1):(g.setFromMatrixColumn(t,0),g.crossVectors(this.object.up,g)),g.multiplyScalar(e),this._panOffset.add(g)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;g.copy(s).sub(this.target);let a=g.length();a*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*a/i.clientHeight,this.object.matrix),this._panUp(2*t*a/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,a=t-i.top,n=i.width,l=i.height;this._mouse.x=s/n*2-1,this._mouse.y=-(a/l)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(_*this._rotateDelta.x/t.clientHeight),this._rotateUp(_*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(_*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-_*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(_*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-_*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,a=Math.sqrt(i*i+s*s);this._dollyStart.set(0,a)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),a=.5*(e.pageY+i.y);this._rotateEnd.set(s,a)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(_*this._rotateDelta.x/t.clientHeight),this._rotateUp(_*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,a=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,a),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const n=(e.pageX+t.x)*.5,l=(e.pageY+t.y)*.5;this._updateZoomParameters(n,l)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new c,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function ze(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r)))}function Ue(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function Fe(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(re),this.state=f.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function je(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case D.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=f.DOLLY;break;case D.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=f.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=f.ROTATE}break;case D.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=f.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=f.PAN}break;default:this.state=f.NONE}this.state!==f.NONE&&this.dispatchEvent(I)}function Ne(r){switch(this.state){case f.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case f.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case f.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function Ie(r){this.enabled===!1||this.enableZoom===!1||this.state!==f.NONE||(r.preventDefault(),this.dispatchEvent(I),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(re))}function He(r){this.enabled!==!1&&this._handleKeyDown(r)}function Ye(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case E.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=f.TOUCH_ROTATE;break;case E.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=f.TOUCH_PAN;break;default:this.state=f.NONE}break;case 2:switch(this.touches.TWO){case E.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=f.TOUCH_DOLLY_PAN;break;case E.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=f.TOUCH_DOLLY_ROTATE;break;default:this.state=f.NONE}break;default:this.state=f.NONE}this.state!==f.NONE&&this.dispatchEvent(I)}function Ge(r){switch(this._trackPointer(r),this.state){case f.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case f.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case f.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case f.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=f.NONE}}function Ve(r){this.enabled!==!1&&r.preventDefault()}function Ze(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function We(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const L={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class P{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Qe=new pe(-1,1,1,-1,0,1);class Xe extends N{constructor(){super(),this.setAttribute("position",new V([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new V([0,2,0,0,2,0],2))}}const Ke=new Xe;class H{constructor(e){this._mesh=new j(Ke,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Qe)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class oe extends P{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof b?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=A.clone(e.uniforms),this.material=new b({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new H(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class X extends P{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),a=e.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let n,l;this.inverse?(n=0,l=1):(n=1,l=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),a.buffers.stencil.setFunc(s.ALWAYS,n,4294967295),a.buffers.stencil.setClear(l),a.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(s.EQUAL,1,4294967295),a.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),a.buffers.stencil.setLocked(!0)}}class qe extends P{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class $e{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new c);this._width=i.width,this._height=i.height,t=new x(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:S}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new oe(L),this.copyPass.material.blending=F,this.clock=new me}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,a=this.passes.length;s<a;s++){const n=this.passes[s];if(n.enabled!==!1){if(n.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),n.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),n.needsSwap){if(i){const l=this.renderer.getContext(),o=this.renderer.state.buffers.stencil;o.setFunc(l.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),o.setFunc(l.EQUAL,1,4294967295)}this.swapBuffers()}X!==void 0&&(n instanceof X?i=!0:n instanceof qe&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new c);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const Je={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new w(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class C extends P{constructor(e,t=1,i,s){super(),this.strength=t,this.radius=i,this.threshold=s,this.resolution=e!==void 0?new c(e.x,e.y):new c(256,256),this.clearColor=new w(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);this.renderTargetBright=new x(a,n,{type:S}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const v=new x(a,n,{type:S});v.texture.name="UnrealBloomPass.h"+u,v.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(v);const p=new x(a,n,{type:S});p.texture.name="UnrealBloomPass.v"+u,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),a=Math.round(a/2),n=Math.round(n/2)}const l=Je;this.highPassUniforms=A.clone(l.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new b({uniforms:this.highPassUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader}),this.separableBlurMaterials=[];const o=[3,5,7,9,11];a=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(o[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new c(1/a,1/n),a=Math.round(a/2),n=Math.round(n/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const h=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=h,this.bloomTintColors=[new m(1,1,1),new m(1,1,1),new m(1,1,1),new m(1,1,1),new m(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=A.clone(L.uniforms),this.blendMaterial=new b({uniforms:this.copyUniforms,vertexShader:L.vertexShader,fragmentShader:L.fragmentShader,blending:q,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new w,this._oldClearAlpha=1,this._basic=new ge,this._fsQuad=new H(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(i,s);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(i,s),this.renderTargetsVertical[a].setSize(i,s),this.separableBlurMaterials[a].uniforms.invSize.value=new c(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(e,t,i,s,a){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const n=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),a&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let l=this.renderTargetBright;for(let o=0;o<this.nMips;o++)this._fsQuad.material=this.separableBlurMaterials[o],this.separableBlurMaterials[o].uniforms.colorTexture.value=l.texture,this.separableBlurMaterials[o].uniforms.direction.value=C.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[o]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[o].uniforms.colorTexture.value=this.renderTargetsHorizontal[o].texture,this.separableBlurMaterials[o].uniforms.direction.value=C.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[o]),e.clear(),this._fsQuad.render(e),l=this.renderTargetsVertical[o];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=n}_getSeparableBlurMaterial(e){const t=[];for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new b({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new c(.5,.5)},direction:{value:new c(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new b({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}C.BlurDirectionX=new c(1,0);C.BlurDirectionY=new c(0,1);class et extends P{constructor(e,t,i=null,s=null,a=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new w}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let a,n;this.overrideMaterial!==null&&(n=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(a=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=n),e.autoClear=s}}class y extends P{constructor(e,t,i,s){super(),this.renderScene=t,this.renderCamera=i,this.selectedObjects=s!==void 0?s:[],this.visibleEdgeColor=new w(1,1,1),this.hiddenEdgeColor=new w(.1,.04,.02),this.edgeGlow=0,this.usePatternTexture=!1,this.patternTexture=null,this.edgeThickness=1,this.edgeStrength=3,this.downSampleRatio=2,this.pulsePeriod=0,this._visibilityCache=new Map,this._selectionCache=new Set,this.resolution=e!==void 0?new c(e.x,e.y):new c(256,256);const a=Math.round(this.resolution.x/this.downSampleRatio),n=Math.round(this.resolution.y/this.downSampleRatio);this.renderTargetMaskBuffer=new x(this.resolution.x,this.resolution.y),this.renderTargetMaskBuffer.texture.name="OutlinePass.mask",this.renderTargetMaskBuffer.texture.generateMipmaps=!1,this.depthMaterial=new ve,this.depthMaterial.side=Z,this.depthMaterial.depthPacking=_e,this.depthMaterial.blending=F,this.prepareMaskMaterial=this._getPrepareMaskMaterial(),this.prepareMaskMaterial.side=Z,this.prepareMaskMaterial.fragmentShader=u(this.prepareMaskMaterial.fragmentShader,this.renderCamera),this.renderTargetDepthBuffer=new x(this.resolution.x,this.resolution.y,{type:S}),this.renderTargetDepthBuffer.texture.name="OutlinePass.depth",this.renderTargetDepthBuffer.texture.generateMipmaps=!1,this.renderTargetMaskDownSampleBuffer=new x(a,n,{type:S}),this.renderTargetMaskDownSampleBuffer.texture.name="OutlinePass.depthDownSample",this.renderTargetMaskDownSampleBuffer.texture.generateMipmaps=!1,this.renderTargetBlurBuffer1=new x(a,n,{type:S}),this.renderTargetBlurBuffer1.texture.name="OutlinePass.blur1",this.renderTargetBlurBuffer1.texture.generateMipmaps=!1,this.renderTargetBlurBuffer2=new x(Math.round(a/2),Math.round(n/2),{type:S}),this.renderTargetBlurBuffer2.texture.name="OutlinePass.blur2",this.renderTargetBlurBuffer2.texture.generateMipmaps=!1,this.edgeDetectionMaterial=this._getEdgeDetectionMaterial(),this.renderTargetEdgeBuffer1=new x(a,n,{type:S}),this.renderTargetEdgeBuffer1.texture.name="OutlinePass.edge1",this.renderTargetEdgeBuffer1.texture.generateMipmaps=!1,this.renderTargetEdgeBuffer2=new x(Math.round(a/2),Math.round(n/2),{type:S}),this.renderTargetEdgeBuffer2.texture.name="OutlinePass.edge2",this.renderTargetEdgeBuffer2.texture.generateMipmaps=!1;const l=4,o=4;this.separableBlurMaterial1=this._getSeparableBlurMaterial(l),this.separableBlurMaterial1.uniforms.texSize.value.set(a,n),this.separableBlurMaterial1.uniforms.kernelRadius.value=1,this.separableBlurMaterial2=this._getSeparableBlurMaterial(o),this.separableBlurMaterial2.uniforms.texSize.value.set(Math.round(a/2),Math.round(n/2)),this.separableBlurMaterial2.uniforms.kernelRadius.value=o,this.overlayMaterial=this._getOverlayMaterial();const h=L;this.copyUniforms=A.clone(h.uniforms),this.materialCopy=new b({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:F,depthTest:!1,depthWrite:!1}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new w,this.oldClearAlpha=1,this._fsQuad=new H(null),this.tempPulseColor1=new w,this.tempPulseColor2=new w,this.textureMatrix=new xe;function u(v,p){const T=p.isPerspectiveCamera?"perspective":"orthographic";return v.replace(/DEPTH_TO_VIEW_Z/g,T+"DepthToViewZ")}}dispose(){this.renderTargetMaskBuffer.dispose(),this.renderTargetDepthBuffer.dispose(),this.renderTargetMaskDownSampleBuffer.dispose(),this.renderTargetBlurBuffer1.dispose(),this.renderTargetBlurBuffer2.dispose(),this.renderTargetEdgeBuffer1.dispose(),this.renderTargetEdgeBuffer2.dispose(),this.depthMaterial.dispose(),this.prepareMaskMaterial.dispose(),this.edgeDetectionMaterial.dispose(),this.separableBlurMaterial1.dispose(),this.separableBlurMaterial2.dispose(),this.overlayMaterial.dispose(),this.materialCopy.dispose(),this._fsQuad.dispose()}setSize(e,t){this.renderTargetMaskBuffer.setSize(e,t),this.renderTargetDepthBuffer.setSize(e,t);let i=Math.round(e/this.downSampleRatio),s=Math.round(t/this.downSampleRatio);this.renderTargetMaskDownSampleBuffer.setSize(i,s),this.renderTargetBlurBuffer1.setSize(i,s),this.renderTargetEdgeBuffer1.setSize(i,s),this.separableBlurMaterial1.uniforms.texSize.value.set(i,s),i=Math.round(i/2),s=Math.round(s/2),this.renderTargetBlurBuffer2.setSize(i,s),this.renderTargetEdgeBuffer2.setSize(i,s),this.separableBlurMaterial2.uniforms.texSize.value.set(i,s)}render(e,t,i,s,a){if(this.selectedObjects.length>0){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const n=e.autoClear;e.autoClear=!1,a&&e.state.buffers.stencil.setTest(!1),e.setClearColor(16777215,1),this._updateSelectionCache(),this._changeVisibilityOfSelectedObjects(!1);const l=this.renderScene.background,o=this.renderScene.overrideMaterial;if(this.renderScene.background=null,this.renderScene.overrideMaterial=this.depthMaterial,e.setRenderTarget(this.renderTargetDepthBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this._changeVisibilityOfSelectedObjects(!0),this._visibilityCache.clear(),this._updateTextureMatrix(),this._changeVisibilityOfNonSelectedObjects(!1),this.renderScene.overrideMaterial=this.prepareMaskMaterial,this.prepareMaskMaterial.uniforms.cameraNearFar.value.set(this.renderCamera.near,this.renderCamera.far),this.prepareMaskMaterial.uniforms.depthTexture.value=this.renderTargetDepthBuffer.texture,this.prepareMaskMaterial.uniforms.textureMatrix.value=this.textureMatrix,e.setRenderTarget(this.renderTargetMaskBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this._changeVisibilityOfNonSelectedObjects(!0),this._visibilityCache.clear(),this._selectionCache.clear(),this.renderScene.background=l,this.renderScene.overrideMaterial=o,this._fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetMaskBuffer.texture,e.setRenderTarget(this.renderTargetMaskDownSampleBuffer),e.clear(),this._fsQuad.render(e),this.tempPulseColor1.copy(this.visibleEdgeColor),this.tempPulseColor2.copy(this.hiddenEdgeColor),this.pulsePeriod>0){const h=.625+Math.cos(performance.now()*.01/this.pulsePeriod)*.75/2;this.tempPulseColor1.multiplyScalar(h),this.tempPulseColor2.multiplyScalar(h)}this._fsQuad.material=this.edgeDetectionMaterial,this.edgeDetectionMaterial.uniforms.maskTexture.value=this.renderTargetMaskDownSampleBuffer.texture,this.edgeDetectionMaterial.uniforms.texSize.value.set(this.renderTargetMaskDownSampleBuffer.width,this.renderTargetMaskDownSampleBuffer.height),this.edgeDetectionMaterial.uniforms.visibleEdgeColor.value=this.tempPulseColor1,this.edgeDetectionMaterial.uniforms.hiddenEdgeColor.value=this.tempPulseColor2,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.separableBlurMaterial1,this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=y.BlurDirectionX,this.separableBlurMaterial1.uniforms.kernelRadius.value=this.edgeThickness,e.setRenderTarget(this.renderTargetBlurBuffer1),e.clear(),this._fsQuad.render(e),this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetBlurBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=y.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.separableBlurMaterial2,this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial2.uniforms.direction.value=y.BlurDirectionX,e.setRenderTarget(this.renderTargetBlurBuffer2),e.clear(),this._fsQuad.render(e),this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetBlurBuffer2.texture,this.separableBlurMaterial2.uniforms.direction.value=y.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer2),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.overlayMaterial,this.overlayMaterial.uniforms.maskTexture.value=this.renderTargetMaskBuffer.texture,this.overlayMaterial.uniforms.edgeTexture1.value=this.renderTargetEdgeBuffer1.texture,this.overlayMaterial.uniforms.edgeTexture2.value=this.renderTargetEdgeBuffer2.texture,this.overlayMaterial.uniforms.patternTexture.value=this.patternTexture,this.overlayMaterial.uniforms.edgeStrength.value=this.edgeStrength,this.overlayMaterial.uniforms.edgeGlow.value=this.edgeGlow,this.overlayMaterial.uniforms.usePatternTexture.value=this.usePatternTexture,a&&e.state.buffers.stencil.setTest(!0),e.setRenderTarget(i),this._fsQuad.render(e),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=n}this.renderToScreen&&(this._fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=i.texture,e.setRenderTarget(null),this._fsQuad.render(e))}_updateSelectionCache(){const e=this._selectionCache;function t(i){i.isMesh&&e.add(i)}e.clear();for(let i=0;i<this.selectedObjects.length;i++)this.selectedObjects[i].traverse(t)}_changeVisibilityOfSelectedObjects(e){const t=this._visibilityCache;for(const i of this._selectionCache)e===!0?i.visible=t.get(i):(t.set(i,i.visible),i.visible=e)}_changeVisibilityOfNonSelectedObjects(e){const t=this._visibilityCache,i=this._selectionCache;function s(a){if(a.isMesh||a.isSprite){if(!i.has(a)){const n=a.visible;(e===!1||t.get(a)===!0)&&(a.visible=e),t.set(a,n)}}else(a.isPoints||a.isLine)&&(e===!0?a.visible=t.get(a):(t.set(a,a.visible),a.visible=e))}this.renderScene.traverse(s)}_updateTextureMatrix(){this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(this.renderCamera.projectionMatrix),this.textureMatrix.multiply(this.renderCamera.matrixWorldInverse)}_getPrepareMaskMaterial(){return new b({uniforms:{depthTexture:{value:null},cameraNearFar:{value:new c(.5,.5)},textureMatrix:{value:null}},vertexShader:`#include <batching_pars_vertex>
				#include <morphtarget_pars_vertex>
				#include <skinning_pars_vertex>

				varying vec4 projTexCoord;
				varying vec4 vPosition;
				uniform mat4 textureMatrix;

				void main() {

					#include <batching_vertex>
					#include <skinbase_vertex>
					#include <begin_vertex>
					#include <morphtarget_vertex>
					#include <skinning_vertex>
					#include <project_vertex>

					vPosition = mvPosition;

					vec4 worldPosition = vec4( transformed, 1.0 );

					#ifdef USE_INSTANCING

						worldPosition = instanceMatrix * worldPosition;

					#endif

					worldPosition = modelMatrix * worldPosition;

					projTexCoord = textureMatrix * worldPosition;

				}`,fragmentShader:`#include <packing>
				varying vec4 vPosition;
				varying vec4 projTexCoord;
				uniform sampler2D depthTexture;
				uniform vec2 cameraNearFar;

				void main() {

					float depth = unpackRGBAToDepth(texture2DProj( depthTexture, projTexCoord ));
					float viewZ = - DEPTH_TO_VIEW_Z( depth, cameraNearFar.x, cameraNearFar.y );
					float depthTest = (-vPosition.z > viewZ) ? 1.0 : 0.0;
					gl_FragColor = vec4(0.0, depthTest, 1.0, 1.0);

				}`})}_getEdgeDetectionMaterial(){return new b({uniforms:{maskTexture:{value:null},texSize:{value:new c(.5,.5)},visibleEdgeColor:{value:new m(1,1,1)},hiddenEdgeColor:{value:new m(1,1,1)}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform vec2 texSize;
				uniform vec3 visibleEdgeColor;
				uniform vec3 hiddenEdgeColor;

				void main() {
					vec2 invSize = 1.0 / texSize;
					vec4 uvOffset = vec4(1.0, 0.0, 0.0, 1.0) * vec4(invSize, invSize);
					vec4 c1 = texture2D( maskTexture, vUv + uvOffset.xy);
					vec4 c2 = texture2D( maskTexture, vUv - uvOffset.xy);
					vec4 c3 = texture2D( maskTexture, vUv + uvOffset.yw);
					vec4 c4 = texture2D( maskTexture, vUv - uvOffset.yw);
					float diff1 = (c1.r - c2.r)*0.5;
					float diff2 = (c3.r - c4.r)*0.5;
					float d = length( vec2(diff1, diff2) );
					float a1 = min(c1.g, c2.g);
					float a2 = min(c3.g, c4.g);
					float visibilityFactor = min(a1, a2);
					vec3 edgeColor = 1.0 - visibilityFactor > 0.001 ? visibleEdgeColor : hiddenEdgeColor;
					gl_FragColor = vec4(edgeColor, 1.0) * vec4(d);
				}`})}_getSeparableBlurMaterial(e){return new b({defines:{MAX_RADIUS:e},uniforms:{colorTexture:{value:null},texSize:{value:new c(.5,.5)},direction:{value:new c(.5,.5)},kernelRadius:{value:1}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;
				uniform float kernelRadius;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}

				void main() {
					vec2 invSize = 1.0 / texSize;
					float sigma = kernelRadius/2.0;
					float weightSum = gaussianPdf(0.0, sigma);
					vec4 diffuseSum = texture2D( colorTexture, vUv) * weightSum;
					vec2 delta = direction * invSize * kernelRadius/float(MAX_RADIUS);
					vec2 uvOffset = delta;
					for( int i = 1; i <= MAX_RADIUS; i ++ ) {
						float x = kernelRadius * float(i) / float(MAX_RADIUS);
						float w = gaussianPdf(x, sigma);
						vec4 sample1 = texture2D( colorTexture, vUv + uvOffset);
						vec4 sample2 = texture2D( colorTexture, vUv - uvOffset);
						diffuseSum += ((sample1 + sample2) * w);
						weightSum += (2.0 * w);
						uvOffset += delta;
					}
					gl_FragColor = diffuseSum/weightSum;
				}`})}_getOverlayMaterial(){return new b({uniforms:{maskTexture:{value:null},edgeTexture1:{value:null},edgeTexture2:{value:null},patternTexture:{value:null},edgeStrength:{value:1},edgeGlow:{value:1},usePatternTexture:{value:0}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform sampler2D edgeTexture1;
				uniform sampler2D edgeTexture2;
				uniform sampler2D patternTexture;
				uniform float edgeStrength;
				uniform float edgeGlow;
				uniform bool usePatternTexture;

				void main() {
					vec4 edgeValue1 = texture2D(edgeTexture1, vUv);
					vec4 edgeValue2 = texture2D(edgeTexture2, vUv);
					vec4 maskColor = texture2D(maskTexture, vUv);
					vec4 patternColor = texture2D(patternTexture, 6.0 * vUv);
					float visibilityFactor = 1.0 - maskColor.g > 0.0 ? 1.0 : 0.5;
					vec4 edgeValue = edgeValue1 + edgeValue2 * edgeGlow;
					vec4 finalColor = edgeStrength * maskColor.r * edgeValue;
					if(usePatternTexture)
						finalColor += + visibilityFactor * (1.0 - maskColor.r) * (1.0 - patternColor.r);
					gl_FragColor = finalColor;
				}`,blending:q,depthTest:!1,depthWrite:!1,transparent:!0})}}y.BlurDirectionX=new c(1,0);y.BlurDirectionY=new c(0,1);const tt={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new c(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;

		#define EDGE_STEP_COUNT 6
		#define EDGE_GUESS 8.0
		#define EDGE_STEPS 1.0, 1.5, 2.0, 2.0, 2.0, 4.0
		const float edgeSteps[EDGE_STEP_COUNT] = float[EDGE_STEP_COUNT]( EDGE_STEPS );

		float _ContrastThreshold = 0.0312;
		float _RelativeThreshold = 0.063;
		float _SubpixelBlending = 1.0;

		vec4 Sample( sampler2D  tex2D, vec2 uv ) {

			return texture( tex2D, uv );

		}

		float SampleLuminance( sampler2D tex2D, vec2 uv ) {

			return dot( Sample( tex2D, uv ).rgb, vec3( 0.3, 0.59, 0.11 ) );

		}

		float SampleLuminance( sampler2D tex2D, vec2 texSize, vec2 uv, float uOffset, float vOffset ) {

			uv += texSize * vec2(uOffset, vOffset);
			return SampleLuminance(tex2D, uv);

		}

		struct LuminanceData {

			float m, n, e, s, w;
			float ne, nw, se, sw;
			float highest, lowest, contrast;

		};

		LuminanceData SampleLuminanceNeighborhood( sampler2D tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData l;
			l.m = SampleLuminance( tex2D, uv );
			l.n = SampleLuminance( tex2D, texSize, uv,  0.0,  1.0 );
			l.e = SampleLuminance( tex2D, texSize, uv,  1.0,  0.0 );
			l.s = SampleLuminance( tex2D, texSize, uv,  0.0, -1.0 );
			l.w = SampleLuminance( tex2D, texSize, uv, -1.0,  0.0 );

			l.ne = SampleLuminance( tex2D, texSize, uv,  1.0,  1.0 );
			l.nw = SampleLuminance( tex2D, texSize, uv, -1.0,  1.0 );
			l.se = SampleLuminance( tex2D, texSize, uv,  1.0, -1.0 );
			l.sw = SampleLuminance( tex2D, texSize, uv, -1.0, -1.0 );

			l.highest = max( max( max( max( l.n, l.e ), l.s ), l.w ), l.m );
			l.lowest = min( min( min( min( l.n, l.e ), l.s ), l.w ), l.m );
			l.contrast = l.highest - l.lowest;
			return l;

		}

		bool ShouldSkipPixel( LuminanceData l ) {

			float threshold = max( _ContrastThreshold, _RelativeThreshold * l.highest );
			return l.contrast < threshold;

		}

		float DeterminePixelBlendFactor( LuminanceData l ) {

			float f = 2.0 * ( l.n + l.e + l.s + l.w );
			f += l.ne + l.nw + l.se + l.sw;
			f *= 1.0 / 12.0;
			f = abs( f - l.m );
			f = clamp( f / l.contrast, 0.0, 1.0 );

			float blendFactor = smoothstep( 0.0, 1.0, f );
			return blendFactor * blendFactor * _SubpixelBlending;

		}

		struct EdgeData {

			bool isHorizontal;
			float pixelStep;
			float oppositeLuminance, gradient;

		};

		EdgeData DetermineEdge( vec2 texSize, LuminanceData l ) {

			EdgeData e;
			float horizontal =
				abs( l.n + l.s - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.se - 2.0 * l.e ) +
				abs( l.nw + l.sw - 2.0 * l.w );
			float vertical =
				abs( l.e + l.w - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.nw - 2.0 * l.n ) +
				abs( l.se + l.sw - 2.0 * l.s );
			e.isHorizontal = horizontal >= vertical;

			float pLuminance = e.isHorizontal ? l.n : l.e;
			float nLuminance = e.isHorizontal ? l.s : l.w;
			float pGradient = abs( pLuminance - l.m );
			float nGradient = abs( nLuminance - l.m );

			e.pixelStep = e.isHorizontal ? texSize.y : texSize.x;

			if (pGradient < nGradient) {

				e.pixelStep = -e.pixelStep;
				e.oppositeLuminance = nLuminance;
				e.gradient = nGradient;

			} else {

				e.oppositeLuminance = pLuminance;
				e.gradient = pGradient;

			}

			return e;

		}

		float DetermineEdgeBlendFactor( sampler2D  tex2D, vec2 texSize, LuminanceData l, EdgeData e, vec2 uv ) {

			vec2 uvEdge = uv;
			vec2 edgeStep;
			if (e.isHorizontal) {

				uvEdge.y += e.pixelStep * 0.5;
				edgeStep = vec2( texSize.x, 0.0 );

			} else {

				uvEdge.x += e.pixelStep * 0.5;
				edgeStep = vec2( 0.0, texSize.y );

			}

			float edgeLuminance = ( l.m + e.oppositeLuminance ) * 0.5;
			float gradientThreshold = e.gradient * 0.25;

			vec2 puv = uvEdge + edgeStep * edgeSteps[0];
			float pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
			bool pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !pAtEnd; i++ ) {

				puv += edgeStep * edgeSteps[i];
				pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
				pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			}

			if ( !pAtEnd ) {

				puv += edgeStep * EDGE_GUESS;

			}

			vec2 nuv = uvEdge - edgeStep * edgeSteps[0];
			float nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
			bool nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !nAtEnd; i++ ) {

				nuv -= edgeStep * edgeSteps[i];
				nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
				nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			}

			if ( !nAtEnd ) {

				nuv -= edgeStep * EDGE_GUESS;

			}

			float pDistance, nDistance;
			if ( e.isHorizontal ) {

				pDistance = puv.x - uv.x;
				nDistance = uv.x - nuv.x;

			} else {

				pDistance = puv.y - uv.y;
				nDistance = uv.y - nuv.y;

			}

			float shortestDistance;
			bool deltaSign;
			if ( pDistance <= nDistance ) {

				shortestDistance = pDistance;
				deltaSign = pLuminanceDelta >= 0.0;

			} else {

				shortestDistance = nDistance;
				deltaSign = nLuminanceDelta >= 0.0;

			}

			if ( deltaSign == ( l.m - edgeLuminance >= 0.0 ) ) {

				return 0.0;

			}

			return 0.5 - shortestDistance / ( pDistance + nDistance );

		}

		vec4 ApplyFXAA( sampler2D  tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData luminance = SampleLuminanceNeighborhood( tex2D, texSize, uv );
			if ( ShouldSkipPixel( luminance ) ) {

				return Sample( tex2D, uv );

			}

			float pixelBlend = DeterminePixelBlendFactor( luminance );
			EdgeData edge = DetermineEdge( texSize, luminance );
			float edgeBlend = DetermineEdgeBlendFactor( tex2D, texSize, luminance, edge, uv );
			float finalBlend = max( pixelBlend, edgeBlend );

			if (edge.isHorizontal) {

				uv.y += edge.pixelStep * finalBlend;

			} else {

				uv.x += edge.pixelStep * finalBlend;

			}

			return Sample( tex2D, uv );

		}

		void main() {

			gl_FragColor = ApplyFXAA( tDiffuse, resolution.xy, vUv );

		}`},d={isZoomingOut:!1,isMovingTowardsPlanet:!1,targetCameraPosition:new m,hoverEnabled:!1,hasMouseMove:!1,offset:0,ndcRange:new c},M={accelerationOrbit:0,acceleration:1};function it(){console.log("Create the scene");const r=new be,e=new w(1184274);r.background=e,console.log("Create a perspective projection camera");var t=new we(45,window.innerWidth/window.innerHeight,.1,1e3);t.position.set(-175,115,5);const i=document.getElementById("threeCanvas"),s=new Se({canvas:i,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});console.log("Create the renderer"),s.setClearColor(0,0),s.setSize(window.innerWidth,window.innerHeight),s.setPixelRatio(window.devicePixelRatio),s.shadowMap.enabled=!0,s.shadowMap.type=Te,console.log("Create an orbit control");const a=new ke(t,s.domElement);return a.enableDamping=!0,a.dampingFactor=.75,a.screenSpacePanning=!1,a.maxDistance=600,{scene:r,camera:t,renderer:s,controls:a,canvas:i}}function st(r,e,t){const i=new x(window.innerWidth,window.innerHeight,{format:Me,type:ye,depthBuffer:!0,stencilBuffer:!1}),s=new $e(r,i);s.addPass(new et(e,t));const a=new oe(tt),n=r.getPixelRatio();a.material.uniforms.resolution.value.set(1/(window.innerWidth*n),1/(window.innerHeight*n)),s.addPass(a);const l=new y(new c(window.innerWidth,window.innerHeight),e,t);l.edgeStrength=3,l.edgeGlow=1,l.visibleEdgeColor.set(16777215),l.hiddenEdgeColor.set(1640965),s.addPass(l);const o=new C(new c(window.innerWidth,window.innerHeight),1e-4,.4,.001);return o.renderToScreen=!0,o.clear=!1,o.threshold=1,o.radius=.9,s.addPass(o),{composer:s,outlinePass:l,fxaaPass:a}}function at(r){console.log("Add the ambient light");var e=new Ee(2236962,6);const t=new De(16777215,2236962,.2);r.add(e),r.add(t)}function rt(r,e,t){r.add(e),t.forEach(i=>{r.add(i.planet3d)}),window.dispatchEvent(new CustomEvent("planetsLoaded"))}function ot(){d.hoverEnabled=!0,M.accelerationOrbit=1}const nt="/solar-system-portfolio/images/sun.jpg",lt="/solar-system-portfolio/images/8ball.jpg",ne=new Ce;function ht(r){r.forEach(e=>{e.planet3d.visible=!1})}function ut(r){r.scale.set(1.7,1.7,1.7),r.position.y=-50,r.position.z=0,r.position.x=0}function ct(){let e;const t=new $(17.425,64,64);e=new J({emissive:16775311,emissiveMap:ne.load(nt),emissiveIntensity:1,color:new w(16753920)}),e.transparent=!0;const i=new j(t,e);window.dispatchEvent(new CustomEvent("sunLoaded"));const s=new Pe(16646099,1200,400,1.4);return s.shadow.mapSize.width=1024,s.shadow.mapSize.height=1024,s.shadow.camera.near=10,s.shadow.camera.far=20,i.add(s),i.planet=i,window.dispatchEvent(new CustomEvent("sunLoaded")),i}async function dt(){const r=await B("mercury",40,.25);r.planet.rotation.x=-90*Math.PI/180;const e=await B("venus",65,6.8),t=new ft("Earth",9,90,0,lt),i=await B("mars",125,6.5),s=await B("jupiter",160,15),a=await B("saturn",210,1);t.planet.castShadow=!0,t.planet.receiveShadow=!0,r.planet.castShadow=!0,r.planet.receiveShadow=!0,e.planet.castShadow=!0,e.planet.receiveShadow=!0,i.planet.castShadow=!0,i.planet.receiveShadow=!0,s.planet.castShadow=!0,s.planet.receiveShadow=!0,a.planet.castShadow=!0,a.planet.receiveShadow=!0;const n=[{name:"mercury",planet:r.planet,planet3d:r.planet3d,meshes:r.meshes,rotationSpeed:.005,orbitSpeed:.002,orbit:r.orbit,label:"Experience",rotateSelf:(l,o,h)=>l.rotateZ(o*h)},{name:"venus",planet:e.planet,planet3d:e.planet3d,meshes:e.meshes,rotationSpeed:.005,orbitSpeed:6e-4,orbit:e.orbit,label:"Skill sets/Resume",rotateSelf:(l,o,h)=>l.rotateY(o*h)},{name:"earth",planet:t.planet,planet3d:t.planet3d,meshes:t.meshes,rotationSpeed:.005,orbitSpeed:.001,orbit:t.orbit,label:"Robotics",rotateSelf:(l,o,h)=>l.rotateY(o*h)},{name:"mars",planet:i.planet,planet3d:i.planet3d,meshes:i.meshes,rotationSpeed:.008,orbitSpeed:.0012,orbit:i.orbit,label:"Extracurricular",rotateSelf:(l,o,h)=>l.rotateY(o*h)},{name:"jupiter",planet:s.planet,planet3d:s.planet3d,meshes:s.meshes,rotationSpeed:.005,orbitSpeed:6e-4,orbit:s.orbit,label:"Childhood",rotateSelf:(l,o,h)=>l.rotateY(o*h)},{name:"saturn",planet:a.planet,planet3d:a.planet3d,meshes:a.meshes,rotationSpeed:.01,orbitSpeed:2e-4,orbit:a.orbit,label:"About me",rotateSelf:(l,o,h)=>l.rotateY(o*h)}];pt(n);for(const l of n)l.planet3d.rotateY(-.5);return n}function ft(r,e,t,i,s){let a;s instanceof Le?a=s:a=new Oe({map:ne.load(s)});const n=r,l=new $(e,32,20),o=new j(l,a),h=new ee,u=new te;u.add(o),o.position.x=t,o.rotation.z=i*Math.PI/180;const p=new ie(0,0,t,t,0,2*Math.PI,!1,0).getPoints(100),T=new N().setFromPoints(p),k=new se({color:16777215,transparent:!0,opacity:.5}),O=new ae(T,k);return O.rotation.x=Math.PI/2,o.orbit=O,u.add(O),h.add(u),{name:n,planet:o,planet3d:h,orbit:O,meshes:[o]}}async function B(r,e,t){const i=await Be(r);i.traverse(p=>{p.isMesh&&(p.material=new J({map:p.material.map,color:p.material.color}),p.geometry.computeVertexNormals())});const s=new ee,a=new te;a.add(i),i.position.x=e,i.scale.set(t,t,t);const l=new ie(0,0,e,e,0,2*Math.PI,!1,0).getPoints(100),o=new N().setFromPoints(l),h=new se({color:16777215,transparent:!0,opacity:.5}),u=new ae(o,h);u.rotation.x=Math.PI/2,i.orbit=u,a.add(u),s.add(a);let v=[];return i.traverse(p=>{p.isMesh&&v.push(p)}),{name:r,planet:i,planet3d:s,orbit:u,meshes:v}}function pt(r){for(let e=0;e<r.length;e++)r[e].planet3d.traverse(i=>{(i.isMesh||i.isLine)&&(i.material.transparent=!0)})}class mt{constructor({sun:e,planets:t,camera:i,controls:s,outlinePass:a,offsets:n,canvas:l}){this.raycaster=new Re,this.sun=e,this.sunMat=e.material,this.planets=t,this.camera=i,this.controls=s,this.outlinePass=a,this.offsets=n,this.canvas=l,this.raycastTargets=this.planets.flatMap(o=>o.meshes),this.raycastTargets.unshift(this.sun),this.clientMouse=new c,this.onClick=this.onClick.bind(this),this.onMouseMove=this.onMouseMove.bind(this)}onClick(e){e.preventDefault(),d.ndcRange.x=e.clientX/window.innerWidth*2-1,d.ndcRange.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(d.ndcRange,this.camera);var t=this.raycaster.intersectObjects(this.raycastTargets);if(t.length>0){const i=t[0].object,s=vt(i,this.sunMat,this.planets);let a=null;if(s===0?a=this.sun:s>0&&(a=this.planets[s-1]),a){window.planetIndex=s,d.offset=this.offsets[s];const n=new CustomEvent("solarSystemToInfoSection",{detail:{index:window.planetIndex}});window.dispatchEvent(n),M.accelerationOrbit=0;const l=new m;if(a!==this.sun){const h=new CustomEvent("changeSunOpacity",{detail:{opacity:0,duration:1e3}});this.canvas.dispatchEvent(h),a.planet.getWorldPosition(l)}window.dispatchEvent(new CustomEvent("circularBorder")),d.isMovingTowardsPlanet=!0,this.controls.target.copy(l),this.camera.lookAt(l),d.targetCameraPosition.copy(l).add(this.camera.position.clone().sub(l).normalize().multiplyScalar(d.offset));const o=new CustomEvent("hideOutofViewPlanets",{detail:{selectedPlanet:a,delay:300}});this.canvas.dispatchEvent(o),setTimeout(()=>{window.dispatchEvent(new CustomEvent("beginPlanetTransform"))},1e3),document.body.style.cursor="default",d.hoverEnabled=!1,d.hasMouseMove=!1,document.getElementById("hoverCard").style.display="none",this.outlinePass.selectedObjects=[]}}}onMouseMove(e){d.hoverEnabled&&(e.preventDefault(),d.hasMouseMove=!0,this.clientMouse.x=e.clientX,this.clientMouse.y=e.clientY,d.ndcRange.x=e.clientX/window.innerWidth*2-1,d.ndcRange.y=-(e.clientY/window.innerHeight)*2+1)}updateCardForHoveredObject(e,t){if(e===this.sun){t.innerText="Contact me";return}for(const i of this.planets)if(i.meshes.includes(e)){t.innerText=i.label;return}console.log(e,"not found!"),t.innerText="",t.style.display="none"}attach(){this.canvas.addEventListener("click",this.onClick,!1),this.canvas.addEventListener("mousemove",this.onMouseMove,!1)}detach(){this.canvas.removeEventListener("click",this.onClick),this.canvas.removeEventListener("mousemove",this.onMouseMove)}}function gt(r,e){let t=r;for(;t;){if(t===e)return!0;t=t.parent}return!1}function vt(r,e,t){if(r.material===e)return 0;for(let i=0;i<t.length;i++)if(t[i].planet&&gt(r,t[i].planet))return i+1;return null}function _t(r){const e=r.position.y,t=45,i=8e3,s=performance.now();function a(n){const l=n-s,o=Math.min(l/i,1),h=1-Math.pow(1-o,2);r.position.y=e+(t-e)*h,o<1?requestAnimationFrame(a):window.dispatchEvent(new CustomEvent("sunRose"))}requestAnimationFrame(a)}function xt(r){const e=r.position.y,t=0,i=r.scale.x,s=1,a=2500,n=performance.now();function l(o){const h=o-n,u=Math.min(h/a,1),v=u*u*(3-2*u);r.position.y=e+(t-e)*v;const p=i+(s-i)*v;r.scale.set(p,p,p),u<1?requestAnimationFrame(l):window.dispatchEvent(new CustomEvent("sunZoomComplete"))}requestAnimationFrame(l)}function bt(r,e,t=1e3){if(!r)return;r.transparent=!0;const i=r.opacity,s=performance.now();function a(n){const l=n-s,o=Math.min(l/t,1),h=o*o*(3-2*o);r.opacity=i+(e-i)*h,o<1&&requestAnimationFrame(a)}requestAnimationFrame(a)}function wt(r,e,t){const i=r===e;e.material.transparent=!0,e.material.opacity=i?1:0,t.forEach(s=>{const a=s.planet;if(!a)return;const n=s===r;a.traverse(l=>{(l.isMesh||l.isLine)&&l.material&&((Array.isArray(l.material)?l.material:[l.material]).forEach(h=>{h.transparent=!0,h.opacity=n?1:0}),l.visible=!0)})})}function St(r,e,t=300,i=1e3){console.log("selectedPlanet",r);for(let s=e.length-1;s>=0;s--){const a=e[s].planet3d,l=e[s].planet===r.planet;setTimeout(()=>{if(l){if(r.orbit&&r.orbit.material){let u=function(v){const p=v-h,T=Math.min(p/i,1),k=T*T*(3-2*T);o.opacity=1-k,T<1?requestAnimationFrame(u):r.orbit.visible=!1};const o=r.orbit.material;o.transparent=!0;const h=performance.now();requestAnimationFrame(u)}}else yt(a)},(e.length-1-s)*t)}}function Tt(r,e=1e3,t=()=>{}){r.forEach((i,s)=>{setTimeout(()=>{Mt(i.planet3d),s===r.length-1&&setTimeout(()=>{window.dispatchEvent(new CustomEvent("planetsInView")),t()},e)},s*e)})}function yt(r){return new Promise(e=>{r.traverse(t=>{if(t.isMesh||t.isLine){let a=function(n){const l=n-s,o=Math.min(l/200,1),h=1-o*o*(3-2*o);t.material.opacity=h,o<1?requestAnimationFrame(a):(t.visible=!1,e())};const s=performance.now();requestAnimationFrame(a)}})})}function Mt(r){r.visible=!0,r.traverse(e=>{if((e.isMesh||e.isLine)&&e.material){let a=function(n){const l=n-s,o=Math.min(l/i,1),h=o*o*(3-2*o);t.forEach(u=>{u.opacity=h}),o<1&&requestAnimationFrame(a)};e.visible=!0;const t=Array.isArray(e.material)?e.material:[e.material];t.forEach(n=>{n.transparent=!0,n.opacity=0,n.depthWrite===!1&&(n.depthWrite=!0),n.color&&n.color.a!==void 0&&(n.color.a=1)});const i=800,s=performance.now();requestAnimationFrame(a)}})}function Et({event:r,sun:e,planets:t,controls:i,camera:s,offsets:a,canvas:n}){const l=r.detail.index;let o;l==0?o=e:o=t[l-1],d.offset=a[l],o.planet.visible=!0,o.planet.traverse(u=>{u.visible=!0,u.material&&(u.material.transparent=!0,u.material.opacity=1)}),wt(o,e,t);const h=new m;o.planet.getWorldPosition(h),i.target.copy(h),s.lookAt(h),d.targetCameraPosition.copy(h).add(s.position.clone().sub(h).normalize().multiplyScalar(d.offset)),s.position.copy(d.targetCameraPosition)}async function Dt(r,e){d.isZoomingOut=!0,console.log("zoom out received!");const t=new CustomEvent("changeSunOpacity",{detail:{opacity:1,duration:2e3}});r.dispatchEvent(t),e.accelerationOrbit=1;const i=new CustomEvent("revealPlanets",{detail:{delay:1e3}});setTimeout(()=>{window.dispatchEvent(i)},500)}function U({canvas:r,renderer:e,camera:t,fxaaPass:i,composer:s}){const a=window.devicePixelRatio||1;t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),e.setPixelRatio(a),e.setSize(window.innerWidth,window.innerHeight,!1),r.style.width="100vw",r.style.height="100vh",s.setSize(window.innerWidth,window.innerHeight),i&&i.material.uniforms.resolution.value.set(1/(window.innerWidth*a),1/(window.innerHeight*a)),console.log("resize triggered!")}const le=[90,40,40,43,50,65,90],K=new m(-175,115,5);function Ct({canvas:r,renderer:e,camera:t,fxaaPass:i,sun:s,planets:a,controls:n,composer:l}){window.addEventListener("beginTutorial",()=>{setTimeout(()=>{document.getElementById("tutorialCard").classList.add("show")},500)}),document.getElementById("closeTutorial").addEventListener("click",()=>{const h=document.getElementById("tutorialCard");h.style.display="none"}),r.addEventListener("changeSunOpacity",h=>bt(s.material,h.detail.opacity,h.detail.duration)),r.addEventListener("hideOutofViewPlanets",h=>St(h.detail.selectedPlanet,a,h.detail.delay)),window.addEventListener("zoomOutNeeded",()=>{Dt(r,M)}),window.addEventListener("beginSunrise",()=>{_t(s)}),window.addEventListener("solarTransformDownZoomOutCue",()=>{xt(s),M.accelerationOrbit=1}),window.addEventListener("revealPlanets",h=>{Tt(a,h.detail.delay,()=>{d.hoverEnabled=!0})}),window.addEventListener("resize",U({canvas:r,renderer:e,camera:t,fxaaPass:i,composer:l})),window.addEventListener("orientationchange",U({canvas:r,renderer:e,camera:t,fxaaPass:i,composer:l})),window.addEventListener("planetChange",h=>{Et({event:h,sun:s,planets:a,controls:n,camera:t,offsets:le,canvas:r})}),new ResizeObserver(()=>{console.log("Element resized!"),U({canvas:r,renderer:e,camera:t,fxaaPass:i,composer:l})}).observe(document.getElementById("threeCanvas"))}const he=(r,e,t,i,s,a,n)=>{r.rotateY(.0015*M.acceleration);for(const h of e)h.rotateSelf(h.planet,h.rotationSpeed,M.acceleration),h.planet3d.rotateY(h.orbitSpeed*M.accelerationOrbit);t.raycaster.setFromCamera(d.ndcRange,s);var l=t.raycaster.intersectObjects(t.raycastTargets);const o=document.getElementById("hoverCard");if(i.selectedObjects=[],d.hasMouseMove)if(l.length>0&&d.hoverEnabled==!0){const h=l[0].object;document.body.style.cursor="pointer",i.selectedObjects=[h],t.updateCardForHoveredObject(h,o),o.style.left=`${t.clientMouse.x+10}px`,o.style.top=`${t.clientMouse.y+10}px`,o.style.display="block"}else o.innerText="",o.style.display="none",document.body.style.cursor="default";d.isMovingTowardsPlanet?(s.position.lerp(d.targetCameraPosition,.03),s.position.distanceTo(d.targetCameraPosition)<1&&(d.isMovingTowardsPlanet=!1)):d.isZoomingOut&&(s.position.lerp(K,.03),s.position.distanceTo(K)<1&&(d.isZoomingOut=!1)),a.update(),n.render(),requestAnimationFrame(()=>he(r,e,t,i,s,a,n))};async function Lt(r){const{scene:e,camera:t,renderer:i,controls:s,canvas:a}=it(),{composer:n,outlinePass:l,fxaaPass:o}=st(i,e,t);at(e);const h=ct(),u=await dt();rt(e,h,u),r?ot():(ut(h),ht(u));const v=new mt({sun:h,planets:u,camera:t,controls:s,outlinePass:l,offsets:le,canvas:a});v.attach(),he(h,u,v,l,t,s,n),Ct({canvas:a,renderer:i,camera:t,fxaaPass:o,sun:h,planets:u,controls:s,composer:n})}export{Lt as initSolarSystem};
//# sourceMappingURL=solarSystemMain-DYELuy-i.js.map
