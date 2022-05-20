import { LightningElement,wire,track } from 'lwc';
import {getObjectInfo} from 'lightning/uiObjectInfoApi';// need to clarify this
import COUNTRY_OBJECT from '@salesforce/schema/Country__c';
import {getPicklistValues} from 'lightning/uiObjectInfoApi';
import STATES_FIELD from '@salesforce/schema/Country__c.States__c'; //Controlling field
import CITY_FIELD from '@salesforce/schema/Country__c.Cities__c'; // Dependent field

export default class LwcApexPicklistStatesCities extends LightningElement {
    @track statesFieldData;
    @track cityOptions;
    @track cityOptions1;

    @wire(getObjectInfo, {objectApiName: COUNTRY_OBJECT })
    accountInfo;
   

    @wire(getPicklistValues, {recordTypeId: '$accountInfo.data.defaultRecordTypeId', fieldApiName: STATES_FIELD })
    statesFieldInfo({ data, error }) {
        if (data) 
        this.statesFieldData = data.values;
    }

    @wire(getPicklistValues, {recordTypeId:'$accountInfo.data.defaultRecordTypeId', fieldApiName: CITY_FIELD })
    cityFieldInfo({ data, error }) {
        if (data)
         this.cityOptions = data;
    }


    handleUpsellChange(event) { 
        
        let key = this.cityOptions.controllerValues[event.target.value];
        alert('Key is '+event.target.value);
        alert('Key is '+JSON.stringify(this.cityOptions.controllerValues));
        alert('key is'+key);
        alert('key is'+JSON.stringify(this.cityOptions.values));
        this.cityOptions1 = this.cityOptions.values.filter(opt => opt.validFor.includes(key));

       
       
    }
}