import { CollectionType } from "../../../types/type";
import * as Arr from "../reader/array";
import * as Obj from "../reader/object";
import { readWithParser } from "../reader/readWithParser";
import * as Str from "../reader/string";
import { mPipe } from "fp-utilities";

const editorReader = mPipe(
  Obj.read,
  readWithParser({
    name: mPipe(Obj.readKey("name"), Str.read),
    type: mPipe(Obj.readKey("type"), Str.read),
  })
);

export const parseCollectionType = mPipe(
  Obj.read,
  readWithParser<Record<string, unknown>, CollectionType>({
    title: mPipe(Obj.readKey("title"), Str.read),
    id: mPipe(Obj.readKey("id"), Str.read),
    editors: mPipe(
      Obj.readKey("editors"),
      Arr.read,
      Arr.readWithItemReader(editorReader)
    ),
  })
);

export const parseCollectionItem = mPipe(
  Obj.read,
  readWithParser({
    pageData: mPipe(Obj.readKey("pageData"), Obj.read),
    projectData: mPipe(Obj.readKey("projectData"), Obj.read),
    editor: mPipe(
      Obj.readKey("editor"),
      Obj.read,
      readWithParser({
        name: mPipe(Obj.readKey("name"), Str.read),
        type: mPipe(Obj.readKey("type"), Str.read),
      })
    ),
  })
);

export const parseItemPreviewData = mPipe(
  Obj.read,
  readWithParser({
    id: mPipe(Obj.readKey("id"), Str.read),
    slug: mPipe(Obj.readKey("slug"), Str.read),
  })
);
