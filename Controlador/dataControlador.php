<?php
require_once('../Modelo/dataModelo.php');
use Modelo\dataModel;

class dataController{

    public $dataModel;

    public function dataClimateAllCiudades(){
       
        $this->dataModel = new dataModel();
        $content=$this->dataModel->dataAllCiudades();
        echo $content;
 
    }

   public function dataClimateCiudad(){

       $this->dataModel = new dataModel();
       $content=$this->dataModel->dataCiudad($_GET['ciudad']);
       echo json_encode($content);

    }
    public function dataClimateCoordenadas(){

        $this->dataModel = new dataModel();
        $params=$_POST;
        $content=$this->dataModel->dataCoordenadas($params);
        echo json_encode($content);
 
     }

}

$data=new dataController();
switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $data->dataClimateCoordenadas();
        break;
        case 'GET':
           
            isset($_GET['ciudad']) ?  $data->dataClimateCiudad() : $data->dataClimateAllCiudades();
            break;
    default:
        # code...
        break;
}


?>