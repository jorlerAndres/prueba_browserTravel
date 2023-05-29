<?php

namespace Modelo;
//header('Content-Type: application/json; charset=utf-8');
class dataModel{

    public $data;
    public $key='e8619c752267736bfeb3f958e2136ea4';

    function dataAllCiudades(){
           
        $content=file_get_contents("../recursos/city.list.json"); 
       
        return $content;

    }

    function dataCiudad($ciudad){
           
        $content=file_get_contents("https://api.openweathermap.org/data/2.5/weather?q=$ciudad&appid=$this->key"); 
       
        return $content;

    }
    function dataCoordenadas($params){
        
        $latitud=$params['latitud'];
        $longitud=$params['longitud'];

        $content=file_get_contents("https://api.openweathermap.org/data/2.5/weather?lat=$latitud&lon=$longitud&appid=$this->key"); 
       
        return $content;

    }

}

?>