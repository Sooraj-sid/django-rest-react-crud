from .serializers import BookSerializer
from .models import Book
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def book_list(request):
    book = Book.objects.all()
    book_serializer_obj = BookSerializer(book, many=True)
    return Response(book_serializer_obj.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def book_by_id(request, book_id):
    try:
        book_obj = Book.objects.get(book_id=book_id)
        book_serializer_obj = BookSerializer(book_obj,many=False)
        return Response(book_serializer_obj.data, status=status.HTTP_200_OK)
    except Book.DoesNotExist:
        return Response({'message':"Book Not Found"},status=status.HTTP_404_NOT_FOUND)
    
@api_view(['DELETE'])
def delete_book_by_id(request, book_id):
    try:
        book_obj = Book.objects.get(book_id=book_id)
        book_obj.delete()
        return Response({'message':"Book Deleted"},status=status.HTTP_200_OK)
    except Book.DoesNotExist:
        return Response({'message':"Book Not Found"},status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def add_book(request):
    book_serializer_obj = BookSerializer(data=request.data)
    if book_serializer_obj.is_valid():
        book_serializer_obj.save()
        return Response(book_serializer_obj.data, status=status.HTTP_201_CREATED)
    return Response(book_serializer_obj.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_book(request, book_id):
    try:
        book_obj = Book.objects.get(book_id=book_id)
        book_serializer_obj = BookSerializer(instance = book_obj, data=request.data, partial=True)
        if book_serializer_obj.is_valid():
            book_serializer_obj.save()
            return Response(book_serializer_obj.data, status=status.HTTP_200_OK)
        return Response(book_serializer_obj.errors, status=status.HTTP_400_BAD_REQUEST)
    except Book.DoesNotExist:
        return Response({'message': "Book Not Found"}, status=status.HTTP_404_NOT_FOUND)
        