extern crate sdl2;
#[macro_use]
extern crate log;
extern crate env_logger;
extern crate rand;
extern crate num;

mod canvas;
mod sdlcanvas;
mod tgacanvas;
mod geometry;
mod model;

use model::Model;
use geometry::Vector3D;
use sdlcanvas::SdlCanvas;
use canvas::Canvas;

const WIDTH: usize = 700;
const HEIGHT: usize = 700;
const DEPTH: usize = 255;

fn main() {
    env_logger::init().unwrap();
    info!("starting up");
    let light_direction = Vector3D::new(0.0, 0.0, -1.0);
    let mut model = Model::new("obj_african/african_head.obj");
    let mut canvas: SdlCanvas = Canvas::new(WIDTH, HEIGHT);
    info!("drawing model");
    for i in 0..model.faces.len() {
        let face = model.faces[i];
        debug!("processing face:");
        debug!("({}, {}, {})", face[0][0], face[1][0], face[2][0]);
        let mut p: [Vector3D<i32>; 3] = [Vector3D::new(0, 0, 0); 3];
        let mut world_p: [Vector3D<f32>; 3] = [Vector3D::new(0.0, 0.0, 0.0); 3];
        for j in 0..3 {
            world_p[j] = model.vertices[face[j][0] as usize];
            p[j].x = ((world_p[j].x+1.)*WIDTH as f32/2.) as i32;
            p[j].y = ((world_p[j].y+1.)*HEIGHT as f32/2.) as i32;
            p[j].z = ((world_p[j].z+1.)*DEPTH as f32/2.) as i32;
        }
        let n = (world_p[2]-world_p[0])^(world_p[1]-world_p[0]);
        let n = n.normalized(1.0);
        let intensity = n*light_direction;
        if intensity>0.0 {
            canvas.triangle(p[0], p[1], p[2], model.uv(i, 0), model.uv(i, 1), model.uv(i, 2), intensity, &mut model.diffusemap);
        }
    }
    info!("drawing result");
    canvas.out();
    info!("waiting for Enter");
    canvas.wait_for_enter();
}
