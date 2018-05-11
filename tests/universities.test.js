'use strict';

var chai = require('chai');
chai.use(require('chai-things'));
var expect = chai.expect;
var universities = require('../universities.js');

describe('Universities', function(){
    beforeEach(function(done) {
        
        universities.connectDb((err) => {
            if (err) {
                return done(err);
            }
            
            universities.removeAll(function(err) {
                if (err) {
                    return done(err);
                }
                
                
                universities.add([{
                    name: "Universidad de Cádiz", 
                    address: "C/ Ancha 16",
                    city:"Cádiz",
                    ZipCode:"11001",
                    phone:"956019101",
                    fax:"956015049",
                    mail:"secretaria.general@uca.es",
                    web:"http://www.uca.es/" 
                }, {
                    name: "Universidad de Salamanca", 
                    address: "Cardenal Plá y Deniel, 22",
                    city:"Salamanca",
                    ZipCode:"37008",
                    phone:"923294400",
                    fax:"923294693",
                    mail:"informacion@usal.es",
                    web:"http://www.usal.es/"
                }], done);
            });
        });
    });
    
    describe('#allUniversities()', function() {
        it('should return all universities', function(done) {
            universities.allUniversities((err, res) => {
                if (err) {
                    return done(err);
                }
                
                expect(res).to.have.lengthOf(2);
                expect(res).to.contain.an.item.with.property('name', 'Universidad de Cádiz');
                expect(res).to.contain.an.item.with.property('name', 'Universidad de Salamanca');
                done();
            });
        });
    });
    
    describe('#remove()', function() {
        it('should remove the element', function(done) {
            universities.remove('Universidad de Cádiz', (err) => {
                if (err) {
                    return done(err);
                }
                
                universities.allUniversities((err,res) => {
                    if (err) {
                        return done(err);
                    }
                    
                    expect(res).to.have.lengthOf(1);
                    expect(res).not.to.contain.an.item.with.property('name', 'Universidad de Cádiz');
                    done();
                });
            });
        });
    });
});