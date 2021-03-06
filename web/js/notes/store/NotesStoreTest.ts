import {MockNotes} from "../../../../apps/stories/impl/MockNotes";
import {NotesStore} from "./NotesStore";
import {assertJSON} from "../../test/Assertions";
import {Arrays} from "polar-shared/src/util/Arrays";
import {TestingTime} from "polar-shared/src/test/TestingTime";
import {assert} from 'chai';
import {isObservable, isObservableProp} from 'mobx';
import {ReverseIndex} from "./ReverseIndex";
import {Note} from "./Note";
import {ISODateTimeStrings} from "polar-shared/src/metadata/ISODateTimeStrings";

// TODO:

//
// - migrate all operations to merge/join not delete / create
//
// - when we create a new note the active isn't set right


// - the actions no longer work... need to fix them.

// - make sure when we update nodes that the graph is updated when we add links
//
// - how do we make react hooks that work with observability
//
// - doCreateNode should always 'split' even if we're at the beginning or end of
//   a node because it would yield an empty prefix or suffix and this way the same
//   code path is used.
//

describe('NotesStore', function() {

    beforeEach(() => {
        console.log("Freezing time...");
        TestingTime.freeze()
    });

    afterEach(() => {
        console.log("Unfreezing time...");
        TestingTime.unfreeze();
    });

    function createStore() {
        const notes = MockNotes.create();
        const store = new NotesStore();
        store.doPut(notes);
        return store;
    }

    describe("Observability", () => {

        it("NotesStore", () => {

            const store = new NotesStore();

            assert.isTrue(isObservable(store));
            assert.isTrue(isObservableProp(store, 'root'));
            assert.isTrue(isObservableProp(store, 'active'));
            assert.isTrue(isObservableProp(store, 'index'));
            assert.isTrue(isObservableProp(store, 'indexByName'));
            assert.isTrue(isObservableProp(store, 'reverse'));
            assert.isTrue(isObservableProp(store, 'expanded'));
        });

        it("Note", () => {

            const note = new Note(MockNotes.create()[0]);

            assert.isTrue(isObservable(note));
            assert.isTrue(isObservableProp(note, 'content'));
            assert.isTrue(isObservableProp(note, 'items'));
            assert.isTrue(isObservableProp(note, 'updated'));
            assert.isTrue(isObservableProp(note, 'created'));
            assert.isTrue(isObservableProp(note, 'links'));
            assert.isTrue(isObservableProp(note, 'type'));
            assert.isTrue(isObservableProp(note, 'parent'));
            assert.isTrue(isObservableProp(note, 'items'));

        });

    });

    it("initial store sanity", () => {

        const store = createStore();

        assertJSON(store, {
            "_activePos": "start",
            "_expanded": {},
            "_index": {
                "100": {
                    "_content": "World War II (WWII or WW2), also known as the Second World War, was a global war that lasted from 1939 to 1945. It involved the vast majority of the world's countries—including all the great powers—forming two opposing military alliances: the Allies and the Axis.",
                    "_created": "2012-03-02T11:38:49.321Z",
                    "_id": "100",
                    "_items": [],
                    "_links": [],
                    "_type": "item",
                    "_updated": "2012-03-02T11:38:49.321Z"
                },
                "102": {
                    "_content": "World War II",
                    "_created": "2012-03-02T11:38:49.321Z",
                    "_id": "102",
                    "_items": [
                        "103",
                        "104",
                        "105"
                    ],
                    "_links": [],
                    "_type": "named",
                    "_updated": "2012-03-02T11:38:49.321Z"
                },
                "103": {
                    "_content": "[Lasted](https://www.example.com) from 1939 to 1945",
                    "_created": "2012-03-02T11:38:49.321Z",
                    "_id": "103",
                    "_items": [],
                    "_links": [],
                    "_parent": "102",
                    "_type": "item",
                    "_updated": "2012-03-02T11:38:49.321Z"
                },
                "104": {
                    "_content": "Axis Powers: Germany, Italy, Japan",
                    "_created": "2012-03-02T11:38:49.321Z",
                    "_id": "104",
                    "_items": [],
                    "_links": [],
                    "_parent": "102",
                    "_type": "item",
                    "_updated": "2012-03-02T11:38:49.321Z"
                },
                "105": {
                    "_content": "Allied Powers: United States, United Kingdom, [[Canada]], [[Russia]].",
                    "_created": "2012-03-02T11:38:49.321Z",
                    "_id": "105",
                    "_items": [
                        "106"
                    ],
                    "_links": [
                        "109",
                        "108"
                    ],
                    "_parent": "102",
                    "_type": "item",
                    "_updated": "2012-03-02T11:38:49.321Z"
                },
                "106": {
                    "_content": "Lead by Franklin D. Roosevelt, [[Winston Churchill]], and Joseph Stalin ",
                    "_created": "2012-03-02T11:38:49.321Z",
                    "_id": "106",
                    "_items": [],
                    "_links": [
                        "112"
                    ],
                    "_parent": "105",
                    "_type": "item",
                    "_updated": "2012-03-02T11:38:49.321Z"
                },
                "107": {
                    "_content": "Germany",
                    "_created": "2012-03-02T11:38:49.321Z",
                    "_id": "107",
                    "_items": [
                        "110"
                    ],
                    "_links": [],
                    "_type": "named",
                    "_updated": "2012-03-02T11:38:49.321Z"
                },
                "108": {
                    "_content": "Russia",
                    "_created": "2012-03-02T11:38:49.321Z",
                    "_id": "108",
                    "_items": [],
                    "_links": [],
                    "_type": "named",
                    "_updated": "2012-03-02T11:38:49.321Z"
                },
                "109": {
                    "_content": "Canada",
                    "_created": "2012-03-02T11:38:49.321Z",
                    "_id": "109",
                    "_items": [
                        "111"
                    ],
                    "_links": [],
                    "_type": "named",
                    "_updated": "2012-03-02T11:38:49.321Z"
                },
                "110": {
                    "_content": "Germany Germany (German: Deutschland, German pronunciation: [ˈdɔʏtʃlant]), officially the Federal Republic of Germany (German: Bundesrepublik Deutschland, About this soundlisten),[e] is a country in Central and Western Europe and one of the major participants of [[World War II]]",
                    "_created": "2012-03-02T11:38:49.321Z",
                    "_id": "110",
                    "_items": [],
                    "_links": [
                        "102"
                    ],
                    "_parent": "107",
                    "_type": "item",
                    "_updated": "2012-03-02T11:38:49.321Z"
                },
                "111": {
                    "_content": "Canada is north of the United States",
                    "_created": "2012-03-02T11:38:49.321Z",
                    "_id": "111",
                    "_items": [],
                    "_links": [],
                    "_parent": "109",
                    "_type": "item",
                    "_updated": "2012-03-02T11:38:49.321Z"
                },
                "112": {
                    "_content": "Winston Churchill",
                    "_created": "2012-03-02T11:38:49.321Z",
                    "_id": "112",
                    "_items": [],
                    "_links": [],
                    "_type": "named",
                    "_updated": "2012-03-02T11:38:49.321Z"
                }
            },
            "_indexByName": {
                "Canada": "109",
                "Germany": "107",
                "Russia": "108",
                "Winston Churchill": "112",
                "World War II": "102"
            },
            "_noteEditors": {},
            "_reverse": {
                "index": {
                    "102": [
                        "110"
                    ],
                    "108": [
                        "105"
                    ],
                    "109": [
                        "105"
                    ],
                    "112": [
                        "106"
                    ]
                }
            },
            "_selected": {}
        });

    });

    it("initial reverse index", async function() {

        const store = createStore();

        assertJSON(store.lookupReverse('109'), ['105']);

    });

    describe("lookupReverse", () => {

        it("102", () => {

            const store = createStore();

            const references = store.lookupReverse('102');
            assertJSON(references, ['110']);

        });

    });

    describe("doIndent", () => {

        it("second child note", async function() {

            const store = createStore();

            assertJSON(store.getNote('102'), {
                "_content": "World War II",
                "_created": "2012-03-02T11:38:49.321Z",
                "_id": "102",
                "_items": [
                    "103",
                    "104",
                    "105"
                ],
                "_links": [],
                "_type": "named",
                "_updated": "2012-03-02T11:38:49.321Z"
            });

            assertJSON(store.expanded, {});

            TestingTime.forward(1000);

            const newParentID = store.doIndent('104')

            assertJSON(store.getNote('102'), {
                "_content": "World War II",
                "_created": "2012-03-02T11:38:49.321Z",
                "_id": "102",
                "_items": [
                    "103",
                    "105"
                ],
                "_links": [],
                "_type": "named",
                "_updated": "2012-03-02T11:38:50.321Z"
            });

            assertJSON(store.getNote(newParentID.value!), {
                "_content": "[Lasted](https://www.example.com) from 1939 to 1945",
                "_created": "2012-03-02T11:38:49.321Z",
                "_id": "103",
                "_items": [
                    "104"
                ],
                "_links": [],
                "_parent": "102",
                "_type": "item",
                "_updated": "2012-03-02T11:38:50.321Z"
            });

            assertJSON(store.expanded, {
                "103": true
            });

        });

        it("indent node and try to indent it again to make sure it fails properly", async function() {

            const store = createStore();

            store.doIndent('104')

            assert.equal(store.doIndent('104').error, 'no-sibling');

        });

        it("indent then unindent and make sure we do a full restore", () => {

            const store = createStore();

            assertJSON(store.getNote('102'), {
                "_content": "World War II",
                "_created": "2012-03-02T11:38:49.321Z",
                "_id": "102",
                "_items": [
                    "103",
                    "104",
                    "105"
                ],
                "_links": [],
                "_type": "named",
                "_updated": "2012-03-02T11:38:49.321Z"
            });

            assertJSON(store.expanded, {});

            store.doIndent('104')

            assert.equal(store.getNote('104')!.parent, '103');

            store.doUnIndent('104');
            // assertJSON(store.doUnIndent('104'), {});

            assertJSON(store.getNote('102'), {
                "_content": "World War II",
                "_created": "2012-03-02T11:38:49.321Z",
                "_id": "102",
                "_items": [
                    "103",
                    "104",
                    "105"
                ],
                "_links": [],
                "_type": "named",
                "_updated": "2012-03-02T11:38:49.321Z"
            });

        });

        it("indent or a root node", () => {

            const store = createStore();

            const result = store.doIndent('108')

            assert.equal(result.error!, 'no-parent');

        });

        it("indent the first node and fail properly", () => {
            // this should not work because there should be no previous sibling
            // to make as the new parent.

            const store = createStore();

            const result = store.doIndent('103')

            assert.equal(result.error!, 'no-sibling');

        });

    });

    it("basic", async function() {

        const store = createStore();

        assertJSON(Object.keys(store.index), [
            "100",
            "102",
            "103",
            "104",
            "105",
            "106",
            "107",
            "108",
            "109",
            "110",
            "111",
            "112"
        ]);

        assertJSON(Object.keys(store.indexByName), [
            "World War II",
            "Russia",
            "Canada",
            "Germany",
            "Winston Churchill"
        ]);

        assertJSON(Arrays.first(Object.values(store.index)), {
            "_content": "World War II (WWII or WW2), also known as the Second World War, was a global war that lasted from 1939 to 1945. It involved the vast majority of the world's countries—including all the great powers—forming two opposing military alliances: the Allies and the Axis.",
            "_created": "2012-03-02T11:38:49.321Z",
            "_id": "100",
            "_items": [],
            "_links": [],
            "_type": "item",
            "_updated": "2012-03-02T11:38:49.321Z",
        });

    });

    describe("prevSibling", () => {

        it("no prev sibling", () => {
            const store = createStore()

            assert.equal(store.prevSibling('104'), '103')
        });

        it("has prev sibling", () => {
            const store = createStore()

            assert.isUndefined(store.prevSibling('103'))

        });


    });

    describe("canMerge", () => {

        it("mergeable", () => {

            const store = createStore()

            assertJSON(store.canMerge('104'), {
                "source": "104",
                "target": "103"
            });

        });

        it("unmergeable", () => {

            const store = createStore()

            assert.isUndefined(store.canMerge('103'),);

        });
    });

    describe("mergeNotes", () => {

        it("basic merge", () => {

            const store = createStore()

            // merge 103 and 104

            TestingTime.forward(1000);

            store.mergeNotes('103', '104');

            assert.isUndefined(store.getNote('104'));

            assertJSON(store.getNote('103'), {
                "_content": "[Lasted](https://www.example.com) from 1939 to 1945 Axis Powers: Germany, Italy, Japan",
                "_created": "2012-03-02T11:38:49.321Z",
                "_id": "103",
                "_items": [],
                "_links": [],
                "_parent": "102",
                "_type": "item",
                "_updated": "2012-03-02T11:38:50.321Z"
            });

        });

    });

    describe("Notes", () => {

        it("setContent", () => {

            const store = createStore();

            const note = store.getNote('102')

            assertJSON(note, {
                "_content": "World War II",
                "_created": "2012-03-02T11:38:49.321Z",
                "_id": "102",
                "_items": [
                    "103",
                    "104",
                    "105"
                ],
                "_links": [],
                "_type": "named",
                "_updated": "2012-03-02T11:38:49.321Z"
            });

            TestingTime.forward(1000);

            note!.setContent("hello")

            assertJSON(note, {
                "_content": "hello",
                "_created": "2012-03-02T11:38:49.321Z",
                "_id": "102",
                "_items": [
                    "103",
                    "104",
                    "105"
                ],
                "_links": [],
                "_type": "named",
                "_updated": "2012-03-02T11:38:50.321Z"
            });

        });

    });

    it("doDelete", () => {

        const store = createStore();

        assertJSON(store.lookupReverse('102'), [
            "110"
        ]);

        store.doDelete(['102']);

        assertJSON(store.lookupReverse('102'), []);

    });

    describe("getNoteByTarget", () => {

        it("By ID", () => {
            const store = createStore();
            const note = store.getNoteByTarget('102');
            assert.equal(note?.id, '102');
        });

        it("By Name", () => {

            const store = createStore();
            const note = store.getNoteByTarget('World War II');
            assert.equal(note?.id, '102');

        });

    });

    describe("pathToNote", () => {

        it("Verify that a root note has an empty path", () => {

            const store = createStore();
            const path = store.pathToNote('102');
            assert.equal(path.length, 0);

        });

        it("Path to level 1", () => {

            const store = createStore();
            const path = store.pathToNote('105');
            assert.equal(path.length, 1);

            assert.equal(path[0].id, "102");

        });

        it("Path to level 2", () => {

            const store = createStore();
            const path = store.pathToNote('106');
            assert.equal(path.length, 2);

            assert.equal(path[0].id, "102");
            assert.equal(path[1].id, "105");

        });


    });

    describe("ReverseIndex", () => {

        it("basic", () => {

            const index = new ReverseIndex();

            assertJSON(index, {
                "index": {}
            });

            index.add('102', '101');

            assertJSON(index.get('102'), ['101']);

            index.remove('102', '101');

            assertJSON(index.get('102'), []);

        });

    });

    describe("createNewNote", () => {

        it("Make sure first child when having existing children.", () => {

            const store = createStore();

            const note = store.getNote('102');

            TestingTime.forward(60 * 1000);

            const now = ISODateTimeStrings.create();

            assertJSON(note!.items, [
                "103",
                "104",
                "105"
            ]);

            const createdNote = store.createNewNote('102');

            assertJSON(note!.items, [
                createdNote.id,
                "103",
                "104",
                "105"
            ]);

            const newNote = store.getNote(createdNote.id)!;

            assert.equal(newNote.created, now);
            assert.equal(newNote.updated, now);
            assert.equal(newNote.parent, note!.id);

            assert.equal(note!.updated, now);

            // assertJSON(store, {});

        });

        it("Add child to root node with no children", () => {

            const store = createStore();

            const note = store.getNote('102');

            store.doDelete(['103', '104', '105']);

            assertJSON(note!.items, [
            ]);

            const createdNote = store.createNewNote('102');
            assertJSON(note!.items, [
                createdNote.id,
            ]);

        });

        it("Make sure it's the child of an expanded note", () => {

            const store = createStore();

            function createNoteWithoutExpansion() {

                const createdNote = store.createNewNote('105');

                assert.equal(createdNote.parent, '102');

                const note = store.getNote('102');

                assertJSON(note!.items, [
                    "103",
                    "104",
                    "105",
                    createdNote.id
                ]);

            }

            function createNoteWithExpansion() {
                store.expand('105');

                const createdNote = store.createNewNote('105');

                assert.equal(createdNote.parent, '105');

                const note = store.getNote('105');

                assertJSON(note!.items, [
                    createdNote.id,
                    "106"
                ]);

            }

            createNoteWithoutExpansion();
            createNoteWithExpansion();



        });

    });

});

