pipeline {
    agent none
    stages {
        stage('checkout') {
            agent {
                label 'slave-1'
            }
            steps {
                git([url: 'https://github.com/autotaker/negainoido-ap-server.git', branch: 'master'])
            }
        }
        stage('build') {
            parallel {
                stage('frontend') {
                    agent {
                        docker {
                            image 'node'
                            label 'slave-1'
                            args '-e HOME=/home/jenkins -v /home/jenkins:/home/jenkins'
                        }
                    }
                    steps {
                        dir('frontend') {
                            sh 'npm install --no-audit'
                            sh 'npm run build'
                        }
                    }
                }
                stage('backend') {
                    agent {
                        label 'slave-1'
                    }
                    steps {
                        dir('backend') {
                            sh 'docker build . -t backend'
                            sh 'docker tag backend gcr.io/negainoido-icfpc-platform/backend:latest'
                            sh 'docker push gcr.io/negainoido-icfpc-platform/backend:latest'
                        }
                    }
                }
            }
        }

        stage('db apply') {
            agent {
                node {
                    label 'slave-1'
                }
            }
            steps {
                script {
                    sh 'wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy'
                    sh 'chmod +x cloud_sql_proxy'
                    sh './cloud_sql_proxy -instances=negainoido-icfpc-platform:asia-northeast1:mysql-negainoido=tcp:3306 &'
                    docker.image('python:3.7-slim-stretch').inside('-e HOME=/home/jenkins --network host -v /home/jenkins:/home/jenkins') {
                        dir('backend') {
                            sh 'pip install --user pipenv'
                            sh 'pipenv install'
                        }
                        dir('backend/icfpc2019/sql') {
                            withCredentials([
                                usernamePassword(credentialsId: 'negainoido-mysql',
                                                    usernameVariable: 'DB_USER',
                                                    passwordVariable: 'DB_PASS')]) {
                                sh "DB_USER=$DB_USER DB_PASS=$DB_PASS pipenv run python dbapply.py"
                            }
                        }
                    }
                }

            }
        }

        
        stage('deploy') {
            parallel { 
                stage('deploy-frontend') {
                    agent {
                        label 'slave-1'
                    }
                    steps {
                        withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-user', 
                                         keyFileVariable: 'identity', 
                                         passphraseVariable: '', 
                                         usernameVariable: 'userName')]) {
                            sh "scp -i ${identity} -r frontend/build/* ${userName}@10.146.0.10:/var/www/html/"
                        }
                    }
                }
                stage('deploy-backend') {
                    agent {
                        label 'slave-1'
                    }
                    steps {
                        sh 'gcloud beta  --project negainoido-icfpc-platform run deploy backend --image gcr.io/negainoido-icfpc-platform/backend:latest --platform managed --region asia-northeast1'
                    }
                }
            }
        }
    }
}

