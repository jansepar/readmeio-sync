'use strict';

var assert = require('chai').assert;
var Document = require('../lib/resources/document');

describe('Document', function() {
    var docProperties = { 'title': 'Title', slug: 'slug', excerpt: 'Excerpt', version: 'v1.0' };
    it('can accept properties', function() {
        var doc = new Document(docProperties);

        Object.keys(docProperties).forEach(function(key) {
            assert.equal(doc[key], docProperties[key]);
        });
    });

    it('can be built from a filepath', function() {
        var filepath = 'test/fixtures/project-fixture/v1.0/documentation/1-Category 1/1-V1-C1-P1.md';
        var doc = Document.fromFilepath(filepath);

        assert.equal(doc.order, 1);
        assert.equal(doc.title, 'V1-C1-P1');
        assert.equal(doc.slug, 'v1-c1-p1');
        assert.equal(doc.excerpt, 'Version 1, Category 1, Page 1');
        assert.equal(doc.body, filepath);
    });

    it('has a type', function() {
        assert.equal(new Document({}).getType(), 'doc');
    });

    it('has a toString()', function() {
        var doc = new Document(docProperties);

        assert.equal(doc.toString(), 'v1.0 - Title <slug>');

        doc.method = 'delete';
        assert.equal(doc.toString(), 'DELETE: v1.0 - Title <slug>');
    });

});
