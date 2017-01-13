'use strict';

var testFaseA = { nomeFile: '2015-03-31 - MI - Fase B - La pratica dello Yin e Yang - Fabiana.mp3',
        fullpath: '/media/giuseppe/KINGSTONE/2_ARCHIVIO REGISTRAZIONI/8_FASE B/B25_Pratica Yin Yang/',
        relativePath: '/8_FASE B/B25_Pratica Yin Yang' },
    testFaseB = { nomeFile: '2016-01-26 - MI - Fase B - Fogueo Temi Fase A - _.mp3',
        fullpath: '/media/giuseppe/KINGSTONE/2_ARCHIVIO REGISTRAZIONI/8_FASE B/B20_Fogueo Studenti Fase B/',
        relativePath: '/8_FASE B/B20_Fogueo Studenti Fase B' },
     testFogueoIstruttori = { nomeFile: '2016-09-25 - MI - Fase C -  Fogueo istruttori_7 Chiese 7 Chackra, Liv Essere_Scala Merav_Stati Eventi ,Evol Inv Rivol - Walter_Daniela.MP3',
        fullpath: '/media/giuseppe/KINGSTONE/2_ARCHIVIO REGISTRAZIONI/5_FOGUEO Istruttori/',
        relativePath: '/5_FOGUEO Istruttori' },
        testWang = { nomeFile: '2016-01-13 - MI - Fase C - occorre un leader per i tempi che verranno - Wang.mp3',
        fullpath: '/media/giuseppe/KINGSTONE/2_ARCHIVIO REGISTRAZIONI/1_WANG/',
        relativePath: '/1_WANG' }, tap = require('tap'),temaFaseAB = require('../utilities/batchUtilities').TemaFaseAB,temaFaseC = require('../utilities/batchUtilities').TemaFaseC,Registrazione = require('../utilities/batchUtilities').Registrazione
        console.log('started')

        var temaB = new temaFaseAB(testFaseA),
        registrazioneFaseA = new Registrazione(testFaseA),
        temaWang = new temaFaseC(testWang),
        fogueoIstruttori = new temaFaseC(testFogueoIstruttori)
        tap.equal(temaB.getCode(),'B25','check code ok')
        tap.equal(temaB.getTitolo(),'Pratica Yin Yang','check titolo ok')
        tap.equal(temaB.getFase(),'FASE B','check fase ok')
        tap.equal(temaWang.getCode(),'1','check code wang ok')
        tap.equal(temaWang.getFase(),'FASE C','temawang fase ok')
        tap.equal(temaB.getRelativePath(),'/8_FASE B/B25_Pratica Yin Yang/' ,'fase B path ok')
        tap.equal(temaWang.getRelativePath(),'/1_WANG/','temaWang ok path')
        tap.equal(temaWang.getTitolo(),'WANG','check titolo temaWang ok')
        tap.equal(fogueoIstruttori.getRelativePath(),'/5_FOGUEO Istruttori/','test fogueoIstruttori, path ok' )
        tap.equal(fogueoIstruttori.getCode(),'5','check code fogueoistruttori ok')
        tap.equal(fogueoIstruttori.getTitolo(),'FOGUEO Istruttori','check titolo fogueoIstruttori ok')
        tap.equal(fogueoIstruttori.getFase(),'FASE C','check fase fogueo istruttori ok')
        tap.same(new Date('2015-03-31'),registrazioneFaseA.getDate(),'data registrazione fase A ok')
        tap.equal(registrazioneFaseA.getTitolo(),'La pratica dello Yin e Yang','titolo registrazione fase A ok')
        tap.equal(registrazioneFaseA.getScuola(),'MI','registrazione scuola ok')
        tap.equal(registrazioneFaseA.getFase(),'Fase B','registrazione fase ok')
        tap.equal(registrazioneFaseA.getRelatore(),'Fabiana')
        tap.equal(registrazioneFaseA.getEstensione(),'mp3')
        tap.equal(registrazioneFaseA.getNomeFile(),'2015-03-31 - MI - Fase B - La pratica dello Yin e Yang - Fabiana.mp3','registrazione nomefile ok')
        tap.equal(registrazioneFaseA.getRelativePath(),'/8_FASE B/B25_Pratica Yin Yang/','registrazioneFaseA relativePath ok')