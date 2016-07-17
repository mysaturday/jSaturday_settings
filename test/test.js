var settings = require('../index')({baseDir: __dirname});
var mocha = require('mocha');
var should = require('should');

describe('# jSaturday_settings', function(){
	it('# Should give error if missing file', function(done){

		try{
			settings.load('MissingFile.json');
		}catch(err){
			err.code.should.equal('MODULE_NOT_FOUND');
			done();
		}

	});
	it('# Should return correct structure with no NODE_ENV', function(done){
		
		var s = settings.load(['Folder1/test1.json', 'Folder1/test2.json']);
		s.should.be.instanceOf(Object);
		s.should.have.property('a', 3);
		s.should.have.property('b');
		s.b.should.have.property('b0', 0);
		s.b.should.have.property('b1', 2);
		s.b.should.have.property('b2', 3);

		done();

	});
	it('# Should return correct structure with no NODE_ENV', function(done){

		var s = settings.load(['Folder1/test2.json', 'Folder1/test1.json']);
		s.should.be.instanceOf(Object);
		s.should.have.property('a', 2);
		s.should.have.property('b');
		s.b.should.have.property('b0', 0);
		s.b.should.have.property('b1', 4);
		s.b.should.have.property('b2', 3);

		done();
	})
	it('# Should return correct structure with NODE_ENV = production', function(done){

		var s = settings.load(['Folder1/test1.json', 'Folder1/test2.json'], 'production');

		s.should.be.instanceOf(Object);
		s.should.have.property('a', 'PROD');
		s.should.have.property('b');
		s.b.should.have.property('b0', 0);
		s.b.should.have.property('b1', 2);
		s.b.should.have.property('b2', 3);
		s.c.should.have.equal(1);

		done();
	})
});