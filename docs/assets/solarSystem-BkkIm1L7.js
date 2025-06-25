import{C as qe,V as x,M as Z,T as W,Q as ye,S as Me,a as c,R as $e,P as Je,b as et,c as me,O as tt,B as ge,F as De,d as k,U as re,W as O,H as U,N as pe,e as it,f as z,A as Le,g as st,h as at,D as Ee,i as rt,j as nt,k as Re,l as Oe,m as Ae,n as ot,o as lt,p as ht,q as ut,r as ct,s as dt,t as ft,u as pt,v as mt,w as gt,x as vt,y as ke,G as ze,E as Ue,L as Fe,z as je,I as _t,J as xt}from"./index-CrzNqif1.js";const Ce={type:"change"},ve={type:"start"},Ne={type:"end"},ae=new $e,Pe=new Je,wt=Math.cos(70*et.DEG2RAD),w=new x,B=2*Math.PI,p={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},fe=1e-6;class bt extends qe{constructor(e,t=null){super(e,t),this.state=p.NONE,this.target=new x,this.cursor=new x,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Z.ROTATE,MIDDLE:Z.DOLLY,RIGHT:Z.PAN},this.touches={ONE:W.ROTATE,TWO:W.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new x,this._lastQuaternion=new ye,this._lastTargetPosition=new x,this._quat=new ye().setFromUnitVectors(e.up,new x(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Me,this._sphericalDelta=new Me,this._scale=1,this._panOffset=new x,this._rotateStart=new c,this._rotateEnd=new c,this._rotateDelta=new c,this._panStart=new c,this._panEnd=new c,this._panDelta=new c,this._dollyStart=new c,this._dollyEnd=new c,this._dollyDelta=new c,this._dollyDirection=new x,this._mouse=new c,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Tt.bind(this),this._onPointerDown=St.bind(this),this._onPointerUp=yt.bind(this),this._onContextMenu=Lt.bind(this),this._onMouseWheel=Et.bind(this),this._onKeyDown=Ct.bind(this),this._onTouchStart=Pt.bind(this),this._onTouchMove=Bt.bind(this),this._onMouseDown=Mt.bind(this),this._onMouseMove=Dt.bind(this),this._interceptControlDown=Rt.bind(this),this._interceptControlUp=Ot.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ce),this.update(),this.state=p.NONE}update(e=null){const t=this.object.position;w.copy(t).sub(this.target),w.applyQuaternion(this._quat),this._spherical.setFromVector3(w),this.autoRotate&&this.state===p.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,a=this.maxAzimuthAngle;isFinite(i)&&isFinite(a)&&(i<-Math.PI?i+=B:i>Math.PI&&(i-=B),a<-Math.PI?a+=B:a>Math.PI&&(a-=B),i<=a?this._spherical.theta=Math.max(i,Math.min(a,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+a)/2?Math.max(i,this._spherical.theta):Math.min(a,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const n=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=n!=this._spherical.radius}if(w.setFromSpherical(this._spherical),w.applyQuaternion(this._quatInverse),t.copy(this.target).add(w),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let n=null;if(this.object.isPerspectiveCamera){const h=w.length();n=this._clampDistance(h*this._scale);const o=h-n;this.object.position.addScaledVector(this._dollyDirection,o),this.object.updateMatrixWorld(),s=!!o}else if(this.object.isOrthographicCamera){const h=new x(this._mouse.x,this._mouse.y,0);h.unproject(this.object);const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=o!==this.object.zoom;const d=new x(this._mouse.x,this._mouse.y,0);d.unproject(this.object),this.object.position.sub(d).add(h),this.object.updateMatrixWorld(),n=w.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;n!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(n).add(this.object.position):(ae.origin.copy(this.object.position),ae.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ae.direction))<wt?this.object.lookAt(this.target):(Pe.setFromNormalAndCoplanarPoint(this.object.up,this.target),ae.intersectPlane(Pe,this.target))))}else if(this.object.isOrthographicCamera){const n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),n!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>fe||8*(1-this._lastQuaternion.dot(this.object.quaternion))>fe||this._lastTargetPosition.distanceToSquared(this.target)>fe?(this.dispatchEvent(Ce),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?B/60*this.autoRotateSpeed*e:B/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){w.setFromMatrixColumn(t,0),w.multiplyScalar(-e),this._panOffset.add(w)}_panUp(e,t){this.screenSpacePanning===!0?w.setFromMatrixColumn(t,1):(w.setFromMatrixColumn(t,0),w.crossVectors(this.object.up,w)),w.multiplyScalar(e),this._panOffset.add(w)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const a=this.object.position;w.copy(a).sub(this.target);let s=w.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),a=e-i.left,s=t-i.top,n=i.width,h=i.height;this._mouse.x=a/n*2-1,this._mouse.y=-(s/h)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(B*this._rotateDelta.x/t.clientHeight),this._rotateUp(B*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(B*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-B*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(B*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-B*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),a=.5*(e.pageY+t.y);this._rotateStart.set(i,a)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),a=.5*(e.pageY+t.y);this._panStart.set(i,a)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,a=e.pageY-t.y,s=Math.sqrt(i*i+a*a);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),a=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(a,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(B*this._rotateDelta.x/t.clientHeight),this._rotateUp(B*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),a=.5*(e.pageY+t.y);this._panEnd.set(i,a)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,a=e.pageY-t.y,s=Math.sqrt(i*i+a*a);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const n=(e.pageX+t.x)*.5,h=(e.pageY+t.y)*.5;this._updateZoomParameters(n,h)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new c,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function St(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r)))}function Tt(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function yt(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ne),this.state=p.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Mt(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Z.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=p.DOLLY;break;case Z.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=p.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=p.ROTATE}break;case Z.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=p.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=p.PAN}break;default:this.state=p.NONE}this.state!==p.NONE&&this.dispatchEvent(ve)}function Dt(r){switch(this.state){case p.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case p.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case p.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function Et(r){this.enabled===!1||this.enableZoom===!1||this.state!==p.NONE||(r.preventDefault(),this.dispatchEvent(ve),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(Ne))}function Ct(r){this.enabled!==!1&&this._handleKeyDown(r)}function Pt(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case W.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=p.TOUCH_ROTATE;break;case W.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=p.TOUCH_PAN;break;default:this.state=p.NONE}break;case 2:switch(this.touches.TWO){case W.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=p.TOUCH_DOLLY_PAN;break;case W.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=p.TOUCH_DOLLY_ROTATE;break;default:this.state=p.NONE}break;default:this.state=p.NONE}this.state!==p.NONE&&this.dispatchEvent(ve)}function Bt(r){switch(this._trackPointer(r),this.state){case p.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case p.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case p.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case p.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=p.NONE}}function Lt(r){this.enabled!==!1&&r.preventDefault()}function Rt(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ot(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const ie={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class X{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const At=new tt(-1,1,1,-1,0,1);class kt extends ge{constructor(){super(),this.setAttribute("position",new De([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new De([0,2,0,0,2,0],2))}}const zt=new kt;class _e{constructor(e){this._mesh=new me(zt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,At)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Ie extends X{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof k?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=re.clone(e.uniforms),this.material=new k({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new _e(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Be extends X{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const a=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let n,h;this.inverse?(n=0,h=1):(n=1,h=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),s.buffers.stencil.setFunc(a.ALWAYS,n,4294967295),s.buffers.stencil.setClear(h),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(a.EQUAL,1,4294967295),s.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),s.buffers.stencil.setLocked(!0)}}class Ut extends X{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Ft{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new c);this._width=i.width,this._height=i.height,t=new O(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:U}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ie(ie),this.copyPass.material.blending=pe,this.clock=new it}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let a=0,s=this.passes.length;a<s;a++){const n=this.passes[a];if(n.enabled!==!1){if(n.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),n.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),n.needsSwap){if(i){const h=this.renderer.getContext(),o=this.renderer.state.buffers.stencil;o.setFunc(h.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),o.setFunc(h.EQUAL,1,4294967295)}this.swapBuffers()}Be!==void 0&&(n instanceof Be?i=!0:n instanceof Ut&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new c);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(i,a),this.renderTarget2.setSize(i,a);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,a)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const jt={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new z(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Q extends X{constructor(e,t=1,i,a){super(),this.strength=t,this.radius=i,this.threshold=a,this.resolution=e!==void 0?new c(e.x,e.y):new c(256,256),this.clearColor=new z(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);this.renderTargetBright=new O(s,n,{type:U}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let m=0;m<this.nMips;m++){const v=new O(s,n,{type:U});v.texture.name="UnrealBloomPass.h"+m,v.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(v);const g=new O(s,n,{type:U});g.texture.name="UnrealBloomPass.v"+m,g.texture.generateMipmaps=!1,this.renderTargetsVertical.push(g),s=Math.round(s/2),n=Math.round(n/2)}const h=jt;this.highPassUniforms=re.clone(h.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new k({uniforms:this.highPassUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader}),this.separableBlurMaterials=[];const o=[3,5,7,9,11];s=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);for(let m=0;m<this.nMips;m++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(o[m])),this.separableBlurMaterials[m].uniforms.invSize.value=new c(1/s,1/n),s=Math.round(s/2),n=Math.round(n/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const d=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=d,this.bloomTintColors=[new x(1,1,1),new x(1,1,1),new x(1,1,1),new x(1,1,1),new x(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=re.clone(ie.uniforms),this.blendMaterial=new k({uniforms:this.copyUniforms,vertexShader:ie.vertexShader,fragmentShader:ie.fragmentShader,blending:Le,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new z,this._oldClearAlpha=1,this._basic=new st,this._fsQuad=new _e(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),a=Math.round(t/2);this.renderTargetBright.setSize(i,a);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,a),this.renderTargetsVertical[s].setSize(i,a),this.separableBlurMaterials[s].uniforms.invSize.value=new c(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2)}render(e,t,i,a,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const n=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let h=this.renderTargetBright;for(let o=0;o<this.nMips;o++)this._fsQuad.material=this.separableBlurMaterials[o],this.separableBlurMaterials[o].uniforms.colorTexture.value=h.texture,this.separableBlurMaterials[o].uniforms.direction.value=Q.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[o]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[o].uniforms.colorTexture.value=this.renderTargetsHorizontal[o].texture,this.separableBlurMaterials[o].uniforms.direction.value=Q.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[o]),e.clear(),this._fsQuad.render(e),h=this.renderTargetsVertical[o];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=n}_getSeparableBlurMaterial(e){const t=[];for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new k({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new c(.5,.5)},direction:{value:new c(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}_getCompositeMaterial(e){return new k({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Q.BlurDirectionX=new c(1,0);Q.BlurDirectionY=new c(0,1);class Nt extends X{constructor(e,t,i=null,a=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=a,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new z}render(e,t,i){const a=e.autoClear;e.autoClear=!1;let s,n;this.overrideMaterial!==null&&(n=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=n),e.autoClear=a}}class Y extends X{constructor(e,t,i,a){super(),this.renderScene=t,this.renderCamera=i,this.selectedObjects=a!==void 0?a:[],this.visibleEdgeColor=new z(1,1,1),this.hiddenEdgeColor=new z(.1,.04,.02),this.edgeGlow=0,this.usePatternTexture=!1,this.patternTexture=null,this.edgeThickness=1,this.edgeStrength=3,this.downSampleRatio=2,this.pulsePeriod=0,this._visibilityCache=new Map,this._selectionCache=new Set,this.resolution=e!==void 0?new c(e.x,e.y):new c(256,256);const s=Math.round(this.resolution.x/this.downSampleRatio),n=Math.round(this.resolution.y/this.downSampleRatio);this.renderTargetMaskBuffer=new O(this.resolution.x,this.resolution.y),this.renderTargetMaskBuffer.texture.name="OutlinePass.mask",this.renderTargetMaskBuffer.texture.generateMipmaps=!1,this.depthMaterial=new at,this.depthMaterial.side=Ee,this.depthMaterial.depthPacking=rt,this.depthMaterial.blending=pe,this.prepareMaskMaterial=this._getPrepareMaskMaterial(),this.prepareMaskMaterial.side=Ee,this.prepareMaskMaterial.fragmentShader=m(this.prepareMaskMaterial.fragmentShader,this.renderCamera),this.renderTargetDepthBuffer=new O(this.resolution.x,this.resolution.y,{type:U}),this.renderTargetDepthBuffer.texture.name="OutlinePass.depth",this.renderTargetDepthBuffer.texture.generateMipmaps=!1,this.renderTargetMaskDownSampleBuffer=new O(s,n,{type:U}),this.renderTargetMaskDownSampleBuffer.texture.name="OutlinePass.depthDownSample",this.renderTargetMaskDownSampleBuffer.texture.generateMipmaps=!1,this.renderTargetBlurBuffer1=new O(s,n,{type:U}),this.renderTargetBlurBuffer1.texture.name="OutlinePass.blur1",this.renderTargetBlurBuffer1.texture.generateMipmaps=!1,this.renderTargetBlurBuffer2=new O(Math.round(s/2),Math.round(n/2),{type:U}),this.renderTargetBlurBuffer2.texture.name="OutlinePass.blur2",this.renderTargetBlurBuffer2.texture.generateMipmaps=!1,this.edgeDetectionMaterial=this._getEdgeDetectionMaterial(),this.renderTargetEdgeBuffer1=new O(s,n,{type:U}),this.renderTargetEdgeBuffer1.texture.name="OutlinePass.edge1",this.renderTargetEdgeBuffer1.texture.generateMipmaps=!1,this.renderTargetEdgeBuffer2=new O(Math.round(s/2),Math.round(n/2),{type:U}),this.renderTargetEdgeBuffer2.texture.name="OutlinePass.edge2",this.renderTargetEdgeBuffer2.texture.generateMipmaps=!1;const h=4,o=4;this.separableBlurMaterial1=this._getSeparableBlurMaterial(h),this.separableBlurMaterial1.uniforms.texSize.value.set(s,n),this.separableBlurMaterial1.uniforms.kernelRadius.value=1,this.separableBlurMaterial2=this._getSeparableBlurMaterial(o),this.separableBlurMaterial2.uniforms.texSize.value.set(Math.round(s/2),Math.round(n/2)),this.separableBlurMaterial2.uniforms.kernelRadius.value=o,this.overlayMaterial=this._getOverlayMaterial();const d=ie;this.copyUniforms=re.clone(d.uniforms),this.materialCopy=new k({uniforms:this.copyUniforms,vertexShader:d.vertexShader,fragmentShader:d.fragmentShader,blending:pe,depthTest:!1,depthWrite:!1}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new z,this.oldClearAlpha=1,this._fsQuad=new _e(null),this.tempPulseColor1=new z,this.tempPulseColor2=new z,this.textureMatrix=new nt;function m(v,g){const H=g.isPerspectiveCamera?"perspective":"orthographic";return v.replace(/DEPTH_TO_VIEW_Z/g,H+"DepthToViewZ")}}dispose(){this.renderTargetMaskBuffer.dispose(),this.renderTargetDepthBuffer.dispose(),this.renderTargetMaskDownSampleBuffer.dispose(),this.renderTargetBlurBuffer1.dispose(),this.renderTargetBlurBuffer2.dispose(),this.renderTargetEdgeBuffer1.dispose(),this.renderTargetEdgeBuffer2.dispose(),this.depthMaterial.dispose(),this.prepareMaskMaterial.dispose(),this.edgeDetectionMaterial.dispose(),this.separableBlurMaterial1.dispose(),this.separableBlurMaterial2.dispose(),this.overlayMaterial.dispose(),this.materialCopy.dispose(),this._fsQuad.dispose()}setSize(e,t){this.renderTargetMaskBuffer.setSize(e,t),this.renderTargetDepthBuffer.setSize(e,t);let i=Math.round(e/this.downSampleRatio),a=Math.round(t/this.downSampleRatio);this.renderTargetMaskDownSampleBuffer.setSize(i,a),this.renderTargetBlurBuffer1.setSize(i,a),this.renderTargetEdgeBuffer1.setSize(i,a),this.separableBlurMaterial1.uniforms.texSize.value.set(i,a),i=Math.round(i/2),a=Math.round(a/2),this.renderTargetBlurBuffer2.setSize(i,a),this.renderTargetEdgeBuffer2.setSize(i,a),this.separableBlurMaterial2.uniforms.texSize.value.set(i,a)}render(e,t,i,a,s){if(this.selectedObjects.length>0){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const n=e.autoClear;e.autoClear=!1,s&&e.state.buffers.stencil.setTest(!1),e.setClearColor(16777215,1),this._updateSelectionCache(),this._changeVisibilityOfSelectedObjects(!1);const h=this.renderScene.background,o=this.renderScene.overrideMaterial;if(this.renderScene.background=null,this.renderScene.overrideMaterial=this.depthMaterial,e.setRenderTarget(this.renderTargetDepthBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this._changeVisibilityOfSelectedObjects(!0),this._visibilityCache.clear(),this._updateTextureMatrix(),this._changeVisibilityOfNonSelectedObjects(!1),this.renderScene.overrideMaterial=this.prepareMaskMaterial,this.prepareMaskMaterial.uniforms.cameraNearFar.value.set(this.renderCamera.near,this.renderCamera.far),this.prepareMaskMaterial.uniforms.depthTexture.value=this.renderTargetDepthBuffer.texture,this.prepareMaskMaterial.uniforms.textureMatrix.value=this.textureMatrix,e.setRenderTarget(this.renderTargetMaskBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this._changeVisibilityOfNonSelectedObjects(!0),this._visibilityCache.clear(),this._selectionCache.clear(),this.renderScene.background=h,this.renderScene.overrideMaterial=o,this._fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetMaskBuffer.texture,e.setRenderTarget(this.renderTargetMaskDownSampleBuffer),e.clear(),this._fsQuad.render(e),this.tempPulseColor1.copy(this.visibleEdgeColor),this.tempPulseColor2.copy(this.hiddenEdgeColor),this.pulsePeriod>0){const d=.625+Math.cos(performance.now()*.01/this.pulsePeriod)*.75/2;this.tempPulseColor1.multiplyScalar(d),this.tempPulseColor2.multiplyScalar(d)}this._fsQuad.material=this.edgeDetectionMaterial,this.edgeDetectionMaterial.uniforms.maskTexture.value=this.renderTargetMaskDownSampleBuffer.texture,this.edgeDetectionMaterial.uniforms.texSize.value.set(this.renderTargetMaskDownSampleBuffer.width,this.renderTargetMaskDownSampleBuffer.height),this.edgeDetectionMaterial.uniforms.visibleEdgeColor.value=this.tempPulseColor1,this.edgeDetectionMaterial.uniforms.hiddenEdgeColor.value=this.tempPulseColor2,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.separableBlurMaterial1,this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=Y.BlurDirectionX,this.separableBlurMaterial1.uniforms.kernelRadius.value=this.edgeThickness,e.setRenderTarget(this.renderTargetBlurBuffer1),e.clear(),this._fsQuad.render(e),this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetBlurBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=Y.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.separableBlurMaterial2,this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial2.uniforms.direction.value=Y.BlurDirectionX,e.setRenderTarget(this.renderTargetBlurBuffer2),e.clear(),this._fsQuad.render(e),this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetBlurBuffer2.texture,this.separableBlurMaterial2.uniforms.direction.value=Y.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer2),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.overlayMaterial,this.overlayMaterial.uniforms.maskTexture.value=this.renderTargetMaskBuffer.texture,this.overlayMaterial.uniforms.edgeTexture1.value=this.renderTargetEdgeBuffer1.texture,this.overlayMaterial.uniforms.edgeTexture2.value=this.renderTargetEdgeBuffer2.texture,this.overlayMaterial.uniforms.patternTexture.value=this.patternTexture,this.overlayMaterial.uniforms.edgeStrength.value=this.edgeStrength,this.overlayMaterial.uniforms.edgeGlow.value=this.edgeGlow,this.overlayMaterial.uniforms.usePatternTexture.value=this.usePatternTexture,s&&e.state.buffers.stencil.setTest(!0),e.setRenderTarget(i),this._fsQuad.render(e),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=n}this.renderToScreen&&(this._fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=i.texture,e.setRenderTarget(null),this._fsQuad.render(e))}_updateSelectionCache(){const e=this._selectionCache;function t(i){i.isMesh&&e.add(i)}e.clear();for(let i=0;i<this.selectedObjects.length;i++)this.selectedObjects[i].traverse(t)}_changeVisibilityOfSelectedObjects(e){const t=this._visibilityCache;for(const i of this._selectionCache)e===!0?i.visible=t.get(i):(t.set(i,i.visible),i.visible=e)}_changeVisibilityOfNonSelectedObjects(e){const t=this._visibilityCache,i=this._selectionCache;function a(s){if(s.isMesh||s.isSprite){if(!i.has(s)){const n=s.visible;(e===!1||t.get(s)===!0)&&(s.visible=e),t.set(s,n)}}else(s.isPoints||s.isLine)&&(e===!0?s.visible=t.get(s):(t.set(s,s.visible),s.visible=e))}this.renderScene.traverse(a)}_updateTextureMatrix(){this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(this.renderCamera.projectionMatrix),this.textureMatrix.multiply(this.renderCamera.matrixWorldInverse)}_getPrepareMaskMaterial(){return new k({uniforms:{depthTexture:{value:null},cameraNearFar:{value:new c(.5,.5)},textureMatrix:{value:null}},vertexShader:`#include <batching_pars_vertex>
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

				}`})}_getEdgeDetectionMaterial(){return new k({uniforms:{maskTexture:{value:null},texSize:{value:new c(.5,.5)},visibleEdgeColor:{value:new x(1,1,1)},hiddenEdgeColor:{value:new x(1,1,1)}},vertexShader:`varying vec2 vUv;

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
				}`})}_getSeparableBlurMaterial(e){return new k({defines:{MAX_RADIUS:e},uniforms:{colorTexture:{value:null},texSize:{value:new c(.5,.5)},direction:{value:new c(.5,.5)},kernelRadius:{value:1}},vertexShader:`varying vec2 vUv;

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
				}`})}_getOverlayMaterial(){return new k({uniforms:{maskTexture:{value:null},edgeTexture1:{value:null},edgeTexture2:{value:null},patternTexture:{value:null},edgeStrength:{value:1},edgeGlow:{value:1},usePatternTexture:{value:0}},vertexShader:`varying vec2 vUv;

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
				}`,blending:Le,depthTest:!1,depthWrite:!1,transparent:!0})}}Y.BlurDirectionX=new c(1,0);Y.BlurDirectionY=new c(0,1);const It={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new c(1/1024,1/512)}},vertexShader:`

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

		}`},Yt="/solar-system-portfolio/images/sun.jpg",Ht=new Ae;function Vt(r){let e;const t=new Re(r,64,64);e=new Oe({emissive:16775311,emissiveMap:Ht.load(Yt),emissiveIntensity:1,color:new z(16753920)}),e.transparent=!0;const i=new me(t,e);i.scale.set(1.7,1.7,1.7),i.position.y=-50,i.position.z=0,i.position.x=0,window.dispatchEvent(new CustomEvent("sunLoaded"));const a=new ot(16646099,1200,400,1.4);return a.shadow.mapSize.width=1024,a.shadow.mapSize.height=1024,a.shadow.camera.near=10,a.shadow.camera.far=20,i.add(a),{sun:i,sunMat:e}}const Gt="/solar-system-portfolio/images/8ball.jpg";async function $t(r){console.log("Create the scene");const e=new lt;console.log("Create a perspective projection camera");var t=new ht(45,window.innerWidth/window.innerHeight,.1,1e3);t.position.set(-175,115,5);const i=document.getElementById("threeCanvas"),a=new ut({canvas:i,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});console.log("Create the renderer"),a.setClearColor(0,0),a.setSize(window.innerWidth,window.innerHeight),a.setPixelRatio(window.devicePixelRatio),console.log("Create an orbit control");const s=new bt(t,a.domElement);s.enableDamping=!0,s.dampingFactor=.75,s.screenSpacePanning=!1,s.maxDistance=600,console.log("Set up texture loader"),new ct;const n=new Ae,h=new O(window.innerWidth,window.innerHeight,{format:ft,type:dt,depthBuffer:!0,stencilBuffer:!1}),o=new Ft(a,h);o.addPass(new Nt(e,t));const d=new Ie(It),m=a.getPixelRatio();d.material.uniforms.resolution.value.set(1/(window.innerWidth*m),1/(window.innerHeight*m)),o.addPass(d);const v=new Y(new c(window.innerWidth,window.innerHeight),e,t);v.edgeStrength=3,v.edgeGlow=1,v.visibleEdgeColor.set(16777215),v.hiddenEdgeColor.set(1640965),o.addPass(v);const g=new Q(new c(window.innerWidth,window.innerHeight),1e-4,.4,.001);g.renderToScreen=!0,g.clear=!1,g.threshold=1,g.radius=.9,o.addPass(g),console.log("Add the ambient light");var H=new pt(2236962,6);e.add(H);const ne=new z(1184274);e.background=ne;const S={accelerationOrbit:1,acceleration:1},A=new mt,V=new c;let oe=!1;function Ye(l){if(!he)return;oe=!0,l.preventDefault(),V.x=l.clientX/window.innerWidth*2-1,V.y=-(l.clientY/window.innerHeight)*2+1,A.setFromCamera(V,t);const f=A.intersectObjects(ce),u=document.getElementById("hoverCard");if(f.length>0){const _=f[0].object;u.style.left=`${l.clientX+10}px`,u.style.top=`${l.clientY+10}px`,u.style.display="block",_===M?u.innerText="Contact me":D.meshes.includes(_)?u.innerText="Resume":T.meshes.includes(_)?u.innerText="Skill sets":_===y.planet||_===y.Atmosphere?u.innerText="Robotics":L.meshes.includes(_)?u.innerText="Extracurricular":R.meshes.includes(_)?u.innerText="Childhood":E.meshes.includes(_)?u.innerText="About me":(u.innerText="",u.style.display="none")}else u.style.display="none"}let K=null,le=!1,q=new x,he=!0,F;function He(l){return l===M?0:l===D?1:l===T?2:l===y?3:l===L?4:l===R?5:l===E?6:-1}function xe(l,f=1e3){if(!$)return;$.transparent=!0;const u=$.opacity,_=performance.now();function C(b){const P=b-_,N=Math.min(P/f,1),I=N*N*(3-2*N);$.opacity=u+(l-u)*I,N<1&&requestAnimationFrame(C)}requestAnimationFrame(C)}function Ve(l){l.preventDefault(),V.x=l.clientX/window.innerWidth*2-1,V.y=-(l.clientY/window.innerHeight)*2+1,A.setFromCamera(V,t);const f=A.intersectObjects(ce);if(f.length>0){const u=f[0].object,_=Ge(u);if(_){window.planetIndex=He(_);const C=new CustomEvent("solarSystemToInfoSection",{detail:{index:window.planetIndex}});window.dispatchEvent(C),S.accelerationOrbit=0;const b=new x;_===M?K=M:(xe(0,1e3),K=_,_.planet.getWorldPosition(b)),window.dispatchEvent(new CustomEvent("circularBorder")),le=!0,s.target.copy(b),t.lookAt(b),q.copy(b).add(t.position.clone().sub(b).normalize().multiplyScalar(F)),Zt(K,J),setTimeout(()=>{window.dispatchEvent(new CustomEvent("beginPlanetTransform"))},1e3),he=!1,oe=!1,document.getElementById("hoverCard").style.display="none",v.selectedObjects=[]}}}function Ge(l){return D.planet&&ee(l,D.planet)?(F=j[1],D):l.material===$?(F=j[0],M):T.planet&&ee(l,T.planet)?(F=j[2],T):l.material===y.planet.material?(F=j[3],y):L.planet&&ee(l,L.planet)?(F=j[4],L):R.planet&&ee(l,R.planet)?(F=j[5],R):E.planet&&ee(l,E.planet)?(F=j[6],E):null}let ue=!1,we=new x(-175,115,5);const We=697/40,{sun:M,sunMat:$}=Vt(We);e.add(M),window.dispatchEvent(new CustomEvent("sunLoaded"));const Ze=new gt(16777215,2236962,.2);e.add(Ze);const D=await te("mercury",40,.2);e.add(D.planet3d),D.planet.rotation.x=-90*Math.PI/180;const T=await te("venus",65,6.1);e.add(T.planet3d);const y=new Kt(n,"Earth",6.4,90,0,Gt);e.add(y.planet3d);const L=await te("mars",115,4);e.add(L.planet3d);const R=await te("jupiter",170,15);e.add(R.planet3d);const E=await te("saturn",240,1);e.add(E.planet3d),window.dispatchEvent(new CustomEvent("planetsLoaded"));const be=[{name:"Sun",mesh:M},{name:"Mercury",mesh:D.planet},{name:"Venus",mesh:T.planet},{name:"Earth",mesh:y.planet},{name:"Mars",mesh:L.planet},{name:"Jupiter",mesh:R.planet},{name:"Saturn",mesh:E.planet}],j=[70,30,30,25,30,65,70],ce=[M,D.planet,T.planet,y.planet,L.planet,R.planet,E.planet];a.shadowMap.enabled=!0,y.planet.castShadow=!0,y.planet.receiveShadow=!0,D.planet.castShadow=!0,D.planet.receiveShadow=!0,T.planet.castShadow=!0,T.planet.receiveShadow=!0,L.planet.castShadow=!0,L.planet.receiveShadow=!0,R.planet.castShadow=!0,R.planet.receiveShadow=!0,E.planet.castShadow=!0,E.planet.receiveShadow=!0;const J=[D.planet3d,T.planet3d,y.planet3d,L.planet3d,R.planet3d,E.planet3d];console.log("planets include saturn",J.includes(E.planet3d)),J.forEach((l,f)=>{l.visible=!1});function Qe(l){l.visible=!0,l.traverse(f=>{if((f.isMesh||f.isLine)&&f.material){let b=function(P){const N=P-C,I=Math.min(N/_,1),G=I*I*(3-2*I);u.forEach(se=>{se.opacity=G}),I<1&&requestAnimationFrame(b)};f.visible=!0;const u=Array.isArray(f.material)?f.material:[f.material];u.forEach(P=>{P.transparent=!0,P.opacity=0,P.depthWrite===!1&&(P.depthWrite=!0),P.color&&P.color.a!==void 0&&(P.color.a=1)});const _=800,C=performance.now();requestAnimationFrame(b)}})}function Se(l=1e3){J.forEach((f,u)=>{setTimeout(()=>{Qe(f),u===J.length-1&&setTimeout(()=>{window.dispatchEvent(new CustomEvent("planetsInView")),he=!0},l)},u*l)})}function Xe(){const l=M.position.y,f=0,u=M.scale.x,_=1,C=2500,b=performance.now();function P(N){const I=N-b,G=Math.min(I/C,1),se=G*G*(3-2*G);M.position.y=l+(f-l)*se;const de=u+(_-u)*se;M.scale.set(de,de,de),G<1?requestAnimationFrame(P):window.dispatchEvent(new CustomEvent("sunZoomComplete"))}requestAnimationFrame(P)}function Te(){if(M.rotateY(.0015),D.planet.rotateZ(.003*S.acceleration),D.planet3d.rotateY(.002*S.accelerationOrbit),T.planet.rotateY(.005*S.acceleration),T.planet3d.rotateY(6e-4*S.accelerationOrbit),y.planet.rotateY(.005*S.acceleration),y.planet3d.rotateY(.001*S.accelerationOrbit),L.planet.rotateY(.008*S.acceleration),L.planet3d.rotateY(.0015*S.accelerationOrbit),R.planet.rotateY(.005*S.acceleration),R.planet3d.rotateY(3e-4*S.accelerationOrbit),E.planet.rotateY(.01*S.acceleration),E.planet3d.rotateY(2e-4*S.accelerationOrbit),oe){A.setFromCamera(V,t);var l=A.intersectObjects(ce);if(v.selectedObjects=[],l.length>0){const f=l[0].object;f===y?v.selectedObjects=[y.planet]:f===T.Atmosphere?v.selectedObjects=[T.planet]:v.selectedObjects=[f]}}le?(t.position.lerp(q,.03),t.position.distanceTo(q)<1&&(le=!1,K&&(K=null))):ue&&(t.position.lerp(we,.03),t.position.distanceTo(we)<1&&(ue=!1)),s.update(),requestAnimationFrame(Te),o.render()}Te(),window.addEventListener("solarTransformDownZoomOutCue",()=>{Xe()}),window.addEventListener("firstReveal",()=>{Se(1e3)}),window.addEventListener("zoomOutNeeded",async()=>{ue=!0,console.log("zoom out received!"),xe(1,2e3),S.accelerationOrbit=1,setTimeout(()=>{Se(500)},500)}),window.addEventListener("beginSunrise",()=>{Qt(M)}),window.addEventListener("planetChange",l=>{const f=l.detail.index,u=be[f],_=j[f];Xt(f,be),u.mesh.visible=!0,u.mesh.traverse(b=>{b.visible=!0,b.material&&(b.material.transparent=!0,b.material.opacity=1)});const C=new x;u.mesh.getWorldPosition(C),s.target.copy(C),t.lookAt(C),q.copy(C).add(t.position.clone().sub(C).normalize().multiplyScalar(_)),t.position.copy(q),console.log(`Camera updated to: ${u.name}`)}),i.addEventListener("mousemove",Ye,!1),i.addEventListener("click",Ve,!1);function Ke(){const l=document.getElementById("threeCanvas"),f=window.getComputedStyle(l).transform;l.style.transform="none",l.getBoundingClientRect();const u=window.innerWidth,_=window.innerHeight;a.setSize(u,_),t.aspect=u/_,t.updateProjectionMatrix(),l.style.transform=f,d.material.uniforms.resolution.value.set(1/(window.innerWidth*m),1/(window.innerHeight*m))}window.addEventListener("resize",Ke)}function ee(r,e){let t=r;for(;t;){if(t===e)return!0;t=t.parent}return!1}function Wt(r){return new Promise(e=>{r.traverse(t=>{if(t.isMesh||t.isLine){let s=function(n){const h=n-a,o=Math.min(h/i,1),d=1-o*o*(3-2*o);t.material.opacity=d,o<1?requestAnimationFrame(s):(t.visible=!1,e())};t.material.transparent=!0;const i=200,a=performance.now();requestAnimationFrame(s)}})})}function Zt(r,e,t=300){for(let i=e.length-1;i>=0;i--){const a=e[i],s=a===r.planet3d;setTimeout(()=>{if(s){if(r.orbit&&r.orbit.material){let d=function(m){const v=m-o,g=Math.min(v/h,1),H=g*g*(3-2*g);n.opacity=1-H,g<1?requestAnimationFrame(d):r.orbit.visible=!1};const n=r.orbit.material;n.transparent=!0;const h=1e3,o=performance.now();requestAnimationFrame(d)}}else Wt(a)},(e.length-1-i)*t)}}function Qt(r){const e=r.position.y,t=45,i=8e3,a=performance.now();function s(n){const h=n-a,o=Math.min(h/i,1),d=1-Math.pow(1-o,2);r.position.y=e+(t-e)*d,o<1?requestAnimationFrame(s):window.dispatchEvent(new CustomEvent("sunRose"))}requestAnimationFrame(s)}function Xt(r,e){e.forEach((t,i)=>{const a=t.mesh;if(!a)return;const s=i===r;a.traverse(n=>{(n.isMesh||n.isLine)&&n.material&&((Array.isArray(n.material)?n.material:[n.material]).forEach(o=>{o.transparent=!0,o.opacity=s?1:0}),n.visible=!0)}),t.orbit&&(t.orbit.visible=s)})}async function te(r,e,t){const i=await vt(r);console.log("name: ",r),console.log("planet: ",i),i.traverse(g=>{g.isMesh&&(g.material=new Oe({map:g.material.map,color:g.material.color}),g.geometry.computeVertexNormals())});const a=new ke,s=new ze;s.add(i),i.position.x=e,i.scale.set(t,t,t);const h=new Ue(0,0,e,e,0,2*Math.PI,!1,0).getPoints(100),o=new ge().setFromPoints(h),d=new Fe({color:16777215,transparent:!0,opacity:.5}),m=new je(o,d);m.rotation.x=Math.PI/2,i.orbit=m,s.add(m),a.add(s);let v=[];return i.traverse(g=>{g.isMesh&&v.push(g)}),{name:r,planet:i,planet3d:a,orbit:m,meshes:v}}function Kt(r,e,t,i,a,s){let n;s instanceof _t?n=s:n=new xt({map:r.load(s)});const h=e,o=new Re(t,32,20),d=new me(o,n),m=new ke,v=new ze;v.add(d),d.position.x=i,d.rotation.z=a*Math.PI/180;const H=new Ue(0,0,i,i,0,2*Math.PI,!1,0).getPoints(100),ne=new ge().setFromPoints(H),S=new Fe({color:16777215,transparent:!0,opacity:.5}),A=new je(ne,S);return A.rotation.x=Math.PI/2,d.orbit=A,v.add(A),m.add(v),{name:h,planet:d,planet3d:m,orbit:A}}export{$t as initSolarSystem};
//# sourceMappingURL=solarSystem-BkkIm1L7.js.map
