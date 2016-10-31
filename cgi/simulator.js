var angles = [0,0,0,0,0,0]; // 周期的にこの角度が読まれて描画される
var ev = "OFF"; // 電磁弁のON/OFFを入れる。今はロボットへの出力専用

function drawRobot()
{
	var scene = new THREE.Scene();
	//var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 2000);
	var camera = new THREE.PerspectiveCamera(75,1.0, 0.1, 2000);
	camera.position.y = 500;
 
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(400,400);
	//document.body.appendChild(renderer.domElement);
	document.getElementById('canvas').appendChild(renderer.domElement);

	//////////////////
	/* リンクの情報 */
	//////////////////
	// ジョイントは1から始まって4が欠番ですが、
	// 配列にはゼロから順に詰めて入っています
	var links = new Array(6); 
	var joints = new Array(6);
	var pivots_link = new Array(6);
	var pivots_joint = new Array(6);
	var h = new Array(6);

	/* LINK 1 */
	//上の半径、下の半径、高さ、上下の分割、横の分割、蓋を閉じるか
	r = 155.0/2;
	h[0] = 180.0;
	geometry = new THREE.CylinderGeometry(r,r,h[0],20,0,false);
	material = new THREE.MeshBasicMaterial({color: 0x777777});
	links[0] = new THREE.Mesh(geometry, material);
	links[0].position.set(0.0,h[0]/2,-1200.0);
	scene.add(links[0]);

	pivots_link[0] = new THREE.Object3D();
	links[0].add(pivots_link[0]);

	/*JOINT 1*/
	geometry = new THREE.CylinderGeometry(5.0,5.0,5.0,20,0,false);
	material = new THREE.MeshBasicMaterial({color: 0xff0000});
	joints[0] = new THREE.Mesh(geometry, material);
	joints[0].position.set(0.0,h[0]/2,0.0);
	pivots_link[0].add(joints[0]);
	
	pivots_joint[0] = new THREE.Object3D();
	joints[0].add(pivots_joint[0]);

	/* LINK 2 */
	r = 116.0/2;
	h[1] = 120.0;
	geometry = new THREE.CylinderGeometry(r,r,h[1],20,0,false);
	material = new THREE.MeshBasicMaterial({color: 0x999999});
	links[1] = new THREE.Mesh(geometry, material);
	links[1].position.x = 0.0;
	links[1].position.y = h[1]/2;
	links[1].position.z = 0.0;
	pivots_joint[0].add(links[1]);

	pivots_link[1] = new THREE.Object3D();
	links[1].add(pivots_link[1]);

	/*JOINT 2*/
	geometry = new THREE.CylinderGeometry(5.0,5.0,5.0,20,0,false);
	material = new THREE.MeshBasicMaterial({color: 0xff0000});
	joints[1] = new THREE.Mesh(geometry, material);
	joints[1].position.set(0.0,h[1]/2,0.0);
	pivots_link[1].add(joints[1]);
	
	pivots_joint[1] = new THREE.Object3D();
	joints[1].add(pivots_joint[1]);

	/* LINK 3 */
	r = 160.0/2;
	h[2] = 250.0;
	geometry = new THREE.CylinderGeometry(r,r,h[2],20,0,false);
	material = new THREE.MeshBasicMaterial({color: 0xbbbbbb});
	links[2] = new THREE.Mesh(geometry, material);
	links[2].position.x = 0.0;
	links[2].position.y = h[2]/2;
	pivots_joint[1].add(links[2]);

	pivots_link[2] = new THREE.Object3D();
	links[2].add(pivots_link[2]);

	/*JOINT 3*/
	geometry = new THREE.CylinderGeometry(5.0,5.0,5.0,20,0,false);
	material = new THREE.MeshBasicMaterial({color: 0xff0000});
	joints[2] = new THREE.Mesh(geometry, material);
	joints[2].position.set(0.0,h[2]/2,0.0);
	pivots_link[2].add(joints[2]);
	
	pivots_joint[2] = new THREE.Object3D();
	joints[2].add(pivots_joint[2]);

	/* LINK 4 */
	r = 116.0/2;
	h[3] = 160.0;
	geometry = new THREE.CylinderGeometry(r,r,h[3],20,0,false);
	material = new THREE.MeshBasicMaterial({color: 0xdddddd});
	links[3] = new THREE.Mesh(geometry, material);
	links[3].position.x = 0.0;
	links[3].position.y = h[3]/2;
	pivots_joint[2].add(links[3]);

	pivots_link[3] = new THREE.Object3D();
	links[3].add(pivots_link[3]);

	/*JOINT 4*/
	geometry = new THREE.CylinderGeometry(5.0,5.0,5.0,20,0,false);
	material = new THREE.MeshBasicMaterial({color: 0xff0000});
	joints[3] = new THREE.Mesh(geometry, material);
	joints[3].position.set(0.0,h[3]/2,0.0);
	pivots_link[3].add(joints[3]);
	
	pivots_joint[3] = new THREE.Object3D();
	joints[3].add(pivots_joint[3]);

	/* LINK 5 */
	r = 80.0/2;
	h[4] = 72.0;
	geometry = new THREE.CylinderGeometry(r,r,h[4],20,0,false);
	material = new THREE.MeshBasicMaterial({color: 0xffffff});
	links[4] = new THREE.Mesh(geometry, material);
	links[4].position.x = 0.0;
	links[4].position.y = h[4]/2;
	pivots_joint[3].add(links[4]);

	pivots_link[4] = new THREE.Object3D();
	links[4].add(pivots_link[4]);

	/*JOINT 5*/
	geometry = new THREE.CylinderGeometry(5.0,5.0,5.0,20,0,false);
	material = new THREE.MeshBasicMaterial({color: 0xff0000});
	joints[4] = new THREE.Mesh(geometry, material);
	joints[4].position.set(0.0,h[4]/2,30.0);
	pivots_link[4].add(joints[4]);
	
	var render = function () {
		requestAnimationFrame(render);
		joints[0].rotation.y = angles[0]/180.0*3.141592;
		for(i=1;i<4;i++)
			joints[i].rotation.x = angles[i]/180.0*3.141592;
		links[4].rotation.y = angles[4]/180.0*3.141592;
		renderer.render(scene, camera);
	};
	render();
}
