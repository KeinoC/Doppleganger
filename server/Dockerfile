FROM python:3.8

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt and install the python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire app
COPY . .

CMD gunicorn -b 0.0.0.0:8000 app:app