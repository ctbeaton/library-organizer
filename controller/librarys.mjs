import { Library } from "../model/library.mjs";

export async function addShow(req, res) {
    let title = req.params.title;

    let msg = await Library.addShow(title);
    res.send(msg);
}

export async function deleteShow(req, res) {
    let title = req.params.title;

    let msg = await Library.deleteShow(title);
    res.send(msg);
}