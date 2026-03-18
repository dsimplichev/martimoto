const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        trim: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true,
        min: 0 
    },
    brand: { 
        type: String, 
        required: true,
        trim: true 
    },
    model: { 
        type: String, 
        required: true,
        trim: true 
    },
    year: { 
        type: String, 
        required: false 
    },

    
    images: {
        type: [String],                   
        default: [],
        validate: {
            validator: function (images) {
                return images.length <= 10;
            },
            message: 'Максимум 10 снимки са позволени на една част!'
        }
    },

    type: { 
        type: String, 
        default: "part" 
    },
    isSold: { 
        type: Boolean, 
        default: false 
    }
}, { 
    timestamps: true 
});


partSchema.index({ brand: 1, model: 1, year: 1 });

const Part = mongoose.model('Part', partSchema);

module.exports = Part;