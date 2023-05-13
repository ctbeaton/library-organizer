import { Library } from "../model/library.mjs";

export async function add(req, res) {
    let title = req.params.title;

    let msg = await Library.add(title);
    res.send(msg);
}