'use strict';

describe('AbstractRenderer: rendering/abstractRenderer.js', function () {

    describe('Default construction', function () {

        var abstractRenderer;
        before(function (done) {
            abstractRenderer = new MyScript.AbstractRenderer();
            done();
        });

        it('Check initial state', function () {
            expect(abstractRenderer).to.be.an('object');
            expect(abstractRenderer).to.be.an.instanceOf(MyScript.AbstractRenderer);
            expect(abstractRenderer).to.have.ownProperty('points');
            expect(abstractRenderer).to.have.ownProperty('drawing');
            expect(abstractRenderer).to.have.ownProperty('showBoundingBoxes');
            expect(abstractRenderer).to.have.ownProperty('parameters');
        });

        it('Get parameters', function () {
            expect(abstractRenderer.getParameters()).to.be.an.instanceOf(MyScript.RenderingParameters);
        });

        it('Set parameters', function () {
            abstractRenderer.setParameters(new MyScript.RenderingParameters());
            expect(abstractRenderer.getParameters()).to.be.an.instanceOf(MyScript.RenderingParameters);
        });

        it('Get show bounding box', function () {
            expect(abstractRenderer.getShowBoundingBoxes()).to.equal(false);
        });

        it('Set show bounding box', function () {
            abstractRenderer.setShowBoundingBoxes(true);
            expect(abstractRenderer.getShowBoundingBoxes()).to.equal(true);
        });

    });

    describe('Workflow', function () {

        var abstractRenderer, context;
        before(function (done) {
            abstractRenderer = new MyScript.AbstractRenderer();
            context = document.createElement('canvas').getContext('2d');
            context.canvas.clientWidth = 800;
            context.canvas.clientHeight = 600;
            done();
        });

        it('Clear context', function () {
            expect(function () {
                abstractRenderer.clear(context);
            }).to.not.throw(Error);
        });

        it('Draw character', function () {
            expect(function () {
                abstractRenderer.drawCharacter(new MyScript.CharacterInputComponent(), context);
            }).to.throw(Error);
            expect(function () {
                abstractRenderer.drawCharacter(new MyScript.CharacterInputComponent(), context, abstractRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw rectangle', function () {
            expect(function () {
                abstractRenderer.drawRectangle(new MyScript.Rectangle(), context);
            }).to.not.throw(Error);
            expect(function () {
                abstractRenderer.drawRectangle(new MyScript.Rectangle(), context, abstractRenderer.getParameters());
            }).to.not.throw(Error);
        });

        it('Draw one point stroke', function () {
            var stroke = new MyScript.Stroke();
            stroke.setX([357]);
            stroke.setY([115]);
            expect(function () {
                abstractRenderer.drawStroke(stroke, context);
            }).to.not.throw(Error);
            expect(function () {
                abstractRenderer.drawStroke(stroke, context, abstractRenderer.getParameters());
            }).to.not.throw(Error);
        });

        it('Draw stroke', function () {
            var stroke = new MyScript.Stroke();
            stroke.setX([357, 357, 357, 357]);
            stroke.setY([115, 116, 122, 133]);
            expect(function () {
                abstractRenderer.drawStroke(stroke, context);
            }).to.not.throw(Error);
            expect(function () {
                abstractRenderer.drawStroke(stroke, context, abstractRenderer.getParameters());
            }).to.not.throw(Error);
        });

        it('Draw strokes', function () {
            var stroke = new MyScript.Stroke();
            stroke.setX([357, 357, 357, 357]);
            stroke.setY([115, 116, 122, 133]);
            expect(function () {
                abstractRenderer.drawStrokes([stroke], context);
            }).to.not.throw(Error);
            expect(function () {
                abstractRenderer.drawStrokes([stroke], context, abstractRenderer.getParameters());
            }).to.not.throw(Error);
        });

        it('Draw components', function () {
            expect(function () {
                abstractRenderer.drawComponents([], context);
            }).to.throw(Error);
            expect(function () {
                abstractRenderer.drawComponent([], context, abstractRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw stroke component', function () {
            expect(function () {
                abstractRenderer.drawComponent(new MyScript.Stroke(), context);
            }).to.not.throw(Error);
            expect(function () {
                abstractRenderer.drawComponent(new MyScript.Stroke(), context, abstractRenderer.getParameters());
            }).to.not.throw(Error);
        });

        it('Draw character component', function () {
            expect(function () {
                abstractRenderer.drawComponent(new MyScript.CharacterInputComponent(), context);
            }).to.throw(Error);
            expect(function () {
                abstractRenderer.drawComponent(new MyScript.CharacterInputComponent(), context, abstractRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw unknown component', function () {
            expect(function () {
                abstractRenderer.drawComponent({test: 'test'}, context);
            }).to.throw(Error);
            expect(function () {
                abstractRenderer.drawComponent({test: 'test'}, context, abstractRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw recognition result', function () {
            expect(function () {
                abstractRenderer.drawRecognitionResult([], new MyScript.TextDocument(), context);
            }).to.throw(Error);
        });

    });
});