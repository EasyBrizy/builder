import { CollectionType } from "../../../types/type";
import { Arr, mPipe, Obj, parse, Str } from "@brizy/readers/src";

const editorReader = mPipe(
  Obj.read,
  parse({
    name: mPipe(Obj.readKey("name"), Str.read),
    type: mPipe(Obj.readKey("type"), Str.read),
  })
);

export const parseCollectionType = mPipe(
  Obj.read,
  parse<Record<string, unknown>, CollectionType>({
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
  parse({
    pageData: mPipe(Obj.readKey("pageData"), Obj.read),
    projectData: mPipe(Obj.readKey("projectData"), Obj.read),
    editor: mPipe(
      Obj.readKey("editor"),
      Obj.read,
      parse({
        name: mPipe(Obj.readKey("name"), Str.read),
        type: mPipe(Obj.readKey("type"), Str.read),
      })
    ),
  })
);

export const parseItemPreviewData = mPipe(
  Obj.read,
  parse({
    id: mPipe(Obj.readKey("id"), Str.read),
    slug: mPipe(Obj.readKey("slug"), Str.read),
  })
);
