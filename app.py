from flask import Flask, request, jsonify, render_template
import pickle
import numpy as np

app = Flask(__name__)

# Load the trained model
model = pickle.load(open("course_recommendation.pkl", "rb"))

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    gre = float(data["gre"])
    toefl = float(data["toefl"])
    cgpa = float(data["cgpa"])

    # Prepare input for the model
    input_features = np.array([[gre, toefl, cgpa]])
    prediction = model.predict(input_features)

    return jsonify({"recommended_courses": prediction.tolist()})

if __name__ == "__main__":
    app.run(debug=True)
