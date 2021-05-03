from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from api import serializer
from api.serializer import BooksSerilazier
from api.models import Books
from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from braces.views import CsrfExemptMixin
import json

@method_decorator(csrf_exempt, name='dispatch')
class Book(CsrfExemptMixin, APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


    def get(self, request):
        books = Books.objects.filter(owner=request.user).all()
        serializer = BooksSerilazier(
            books, many=True, context={"request": request})
        return Response(serializer.data,status=status.HTTP_200_OK)

    def post(self, request):
        serializer = BooksSerilazier(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(owner=request.user)
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        book = Books.objects.get(id=int(pk))
        serializer = BooksSerilazier(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        book = Books.objects.filter(owner=request.user).filter(id=pk)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
